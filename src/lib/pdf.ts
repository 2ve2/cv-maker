import { toCanvas } from 'html-to-image'
import { jsPDF } from 'jspdf'

const A4_WIDTH_MM = 210
const A4_WIDTH_PX = 794
const EXPORT_SCALE = 2

type PdfLinkRegion = {
  url: string
  left: number
  top: number
  width: number
  height: number
}

function nextFrame() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  })
}

async function waitForFonts() {
  if ('fonts' in document) {
    await document.fonts.ready
  }
}

async function waitForImages(root: HTMLElement) {
  const images = Array.from(root.querySelectorAll('img'))
  await Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve()
            return
          }
          img.onload = () => resolve()
          img.onerror = () => resolve()
        }),
    ),
  )
}

function sanitizeFileName(fileName: string) {
  const base = fileName.endsWith('.pdf') ? fileName.slice(0, -4) : fileName
  return `${base.replace(/[^a-z0-9-_ ]/gi, '').trim() || 'cv'}.pdf`
}

function createDownload(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = sanitizeFileName(fileName)
  link.rel = 'noopener'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function normalizeExternalUrl(url: string) {
  const trimmed = url.trim()
  if (!trimmed) return ''
  if (/^(https?:|mailto:|tel:)/i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

/**
 * Walk the element + its first descendants to find the dominant background
 * color the template paints. Falls back to white if everything is transparent.
 */
function detectBackgroundColor(element: HTMLElement): string {
  const candidates: HTMLElement[] = [element]
  const firstChild = element.firstElementChild as HTMLElement | null
  if (firstChild) candidates.push(firstChild)
  const grandChild = firstChild?.firstElementChild as HTMLElement | null
  if (grandChild) candidates.push(grandChild)

  for (const node of candidates) {
    const bg = window.getComputedStyle(node).backgroundColor
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
      return bg
    }
  }
  return '#ffffff'
}

function createExportClone(element: HTMLElement, backgroundColor: string) {
  const stage = document.createElement('div')
  stage.style.position = 'fixed'
  stage.style.left = '-100000px'
  stage.style.top = '0'
  stage.style.width = `${A4_WIDTH_PX}px`
  stage.style.padding = '0'
  stage.style.margin = '0'
  stage.style.background = backgroundColor
  stage.style.zIndex = '-1'
  stage.style.pointerEvents = 'none'
  stage.style.overflow = 'hidden'

  const clone = element.cloneNode(true) as HTMLElement
  clone.style.width = `${A4_WIDTH_PX}px`
  clone.style.maxWidth = `${A4_WIDTH_PX}px`
  clone.style.margin = '0'
  clone.style.borderRadius = '0'
  clone.style.boxShadow = 'none'
  clone.style.overflow = 'hidden'
  clone.style.transform = 'none'
  clone.style.background = backgroundColor

  stage.appendChild(clone)
  document.body.appendChild(stage)

  return {
    clone,
    cleanup: () => {
      document.body.removeChild(stage)
    },
  }
}

function collectPdfLinkRegions(clone: HTMLElement, scale: number): PdfLinkRegion[] {
  const rootRect = clone.getBoundingClientRect()

  return Array.from(clone.querySelectorAll('a[href]'))
    .map((anchor) => {
      const href = normalizeExternalUrl(anchor.getAttribute('href') || '')
      const rect = anchor.getBoundingClientRect()

      if (!href || rect.width <= 0 || rect.height <= 0) return null

      return {
        url: href,
        left: (rect.left - rootRect.left) * scale,
        top: (rect.top - rootRect.top) * scale,
        width: rect.width * scale,
        height: rect.height * scale,
      } satisfies PdfLinkRegion
    })
    .filter((link): link is PdfLinkRegion => Boolean(link))
}

async function renderToCanvas(element: HTMLElement, backgroundColor: string) {
  const { clone, cleanup } = createExportClone(element, backgroundColor)

  try {
    await waitForFonts()
    await nextFrame()
    await waitForImages(clone)
    await nextFrame()

    const canvas = await toCanvas(clone, {
      backgroundColor,
      cacheBust: true,
      pixelRatio: EXPORT_SCALE,
    })

    const scale = canvas.width / clone.getBoundingClientRect().width
    const links = collectPdfLinkRegions(clone, scale)

    return { canvas, links }
  } finally {
    cleanup()
  }
}

function canvasSliceToJpeg(
  source: HTMLCanvasElement,
  top: number,
  height: number,
  backgroundColor: string,
) {
  const pageCanvas = document.createElement('canvas')
  pageCanvas.width = source.width
  pageCanvas.height = height

  const context = pageCanvas.getContext('2d')
  if (!context) throw new Error('Could not prepare PDF page canvas.')

  context.fillStyle = backgroundColor
  context.fillRect(0, 0, pageCanvas.width, pageCanvas.height)
  context.drawImage(source, 0, top, source.width, height, 0, 0, source.width, height)

  return pageCanvas.toDataURL('image/jpeg', 0.98)
}

function addPdfLinks(
  pdf: jsPDF,
  links: PdfLinkRegion[],
  offsetPx: number,
  sliceHeightPx: number,
  pxToMm: number,
) {
  const sliceBottom = offsetPx + sliceHeightPx

  for (const link of links) {
    const linkBottom = link.top + link.height
    const overlapTop = Math.max(link.top, offsetPx)
    const overlapBottom = Math.min(linkBottom, sliceBottom)

    if (overlapBottom <= overlapTop) continue

    pdf.link(
      link.left * pxToMm,
      (overlapTop - offsetPx) * pxToMm,
      link.width * pxToMm,
      (overlapBottom - overlapTop) * pxToMm,
      { url: link.url },
    )
  }
}

/**
 * Builds a multi-page PDF where each page is sized to its slice (no trailing
 * white padding on the last page) and uses the template's background color.
 */
function canvasToPdfBlob(
  canvas: HTMLCanvasElement,
  backgroundColor: string,
  links: PdfLinkRegion[],
) {
  const pxToMm = A4_WIDTH_MM / canvas.width
  const a4HeightInPx = Math.floor((canvas.width * 297) / A4_WIDTH_MM)

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [A4_WIDTH_MM, (a4HeightInPx * pxToMm) || 297],
    compress: true,
  })
  pdf.deletePage(1)

  let offsetPx = 0
  while (offsetPx < canvas.height) {
    const sliceHeightPx = Math.min(a4HeightInPx, canvas.height - offsetPx)
    const sliceHeightMm = sliceHeightPx * pxToMm

    pdf.addPage([A4_WIDTH_MM, sliceHeightMm], 'portrait')
    pdf.setFillColor(backgroundColor)
    pdf.rect(0, 0, A4_WIDTH_MM, sliceHeightMm, 'F')

    const image = canvasSliceToJpeg(canvas, offsetPx, sliceHeightPx, backgroundColor)
    pdf.addImage(image, 'JPEG', 0, 0, A4_WIDTH_MM, sliceHeightMm, undefined, 'FAST')
    addPdfLinks(pdf, links, offsetPx, sliceHeightPx, pxToMm)

    offsetPx += sliceHeightPx
  }

  return pdf.output('blob')
}

export async function exportElementToPdf(element: HTMLElement, fileName: string) {
  const backgroundColor = detectBackgroundColor(element)
  const { canvas, links } = await renderToCanvas(element, backgroundColor)
  const pdfBlob = canvasToPdfBlob(canvas, backgroundColor, links)
  createDownload(pdfBlob, fileName)
}
