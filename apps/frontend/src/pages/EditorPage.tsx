import { useNavigate } from 'react-router'
import { useRef, useState } from 'react'
import { SiteHeader } from '@/components/SiteHeader'
import { CVEditor } from '@/components/CVEditor'
import { useCVDocument } from '@/hooks/use-cv-document'
import { getTemplate } from '@/components/templates/registry'
import { exportElementToPdf } from '@/lib/pdf'
import { projectsService } from '@/lib/projectsService'
import { Download, Globe, Loader2, RefreshCw, Eye, Pencil } from 'lucide-react'

export function EditorPage() {
  const { doc, update, reset } = useCVDocument()
  const previewRef = useRef<HTMLDivElement>(null)
  const [pdfBusy, setPdfBusy] = useState(false)
  const [pubBusy, setPubBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit')
  const navigate = useNavigate()

  const Template = getTemplate(doc.template).Component
  const fileSafeTitle = (doc.title || 'cv').replace(/[^a-z0-9-_ ]/gi, '').trim() || 'cv'

  const handleExportPdf = async () => {
    if (!previewRef.current) return
    setError(null)
    setPdfBusy(true)
    try {
      await exportElementToPdf(previewRef.current, fileSafeTitle)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'PDF export failed'
      setError(msg)
    } finally {
      setPdfBusy(false)
    }
  }

  const handlePublish = async () => {
    if (!previewRef.current) return
    setError(null)
    setPubBusy(true)
    try {
      await exportElementToPdf(previewRef.current, fileSafeTitle)
      const res = await projectsService.createProject({
        title: doc.title || 'Untitled CV',
        content: {
          template: doc.template,
          data: doc.data,
        },
      })
      navigate(`/cv/${res.result.project.id}`)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Publish failed. Make sure the backend is running.'
      setError(msg)
    } finally {
      setPubBusy(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Toolbar */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (confirm('Reset the current CV? This cannot be undone.')) reset()
              }}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card hover:bg-accent text-xs font-medium px-3 py-1.5 transition"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Reset
            </button>

            {/* Mobile tabs */}
            <div className="md:hidden flex rounded-md border border-border overflow-hidden">
              <button
                onClick={() => setMobileTab('edit')}
                className={`px-3 py-1.5 text-xs flex items-center gap-1.5 ${
                  mobileTab === 'edit' ? 'bg-accent text-foreground' : 'text-muted-foreground'
                }`}
              >
                <Pencil className="h-3.5 w-3.5" /> Edit
              </button>
              <button
                onClick={() => setMobileTab('preview')}
                className={`px-3 py-1.5 text-xs flex items-center gap-1.5 ${
                  mobileTab === 'preview' ? 'bg-accent text-foreground' : 'text-muted-foreground'
                }`}
              >
                <Eye className="h-3.5 w-3.5" /> Preview
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportPdf}
              disabled={pdfBusy || pubBusy}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card hover:bg-accent text-xs font-medium px-3 py-2 transition disabled:opacity-50"
            >
              {pdfBusy ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Download className="h-3.5 w-3.5" />
              )}
              Export PDF
            </button>
            <button
              onClick={handlePublish}
              disabled={pdfBusy || pubBusy}
              className="inline-flex items-center gap-1.5 rounded-md bg-[image:var(--gradient-primary)] text-primary-foreground text-xs font-semibold px-3 py-2 shadow-[var(--shadow-glow)] hover:opacity-90 transition disabled:opacity-60"
            >
              {pubBusy ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Globe className="h-3.5 w-3.5" />
              )}
              Export & Publish
            </button>
          </div>
        </div>
        {error && (
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 pb-3">
            <p className="text-xs text-destructive">{error}</p>
          </div>
        )}
      </div>

      {/* Workspace */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-5 grid grid-cols-1 md:grid-cols-[minmax(0,460px)_minmax(0,1fr)] gap-5">
        {/* Editor */}
        <aside
          className={`md:block ${mobileTab === 'edit' ? 'block' : 'hidden'} md:max-h-[calc(100vh-9rem)] md:overflow-y-auto md:pr-2 scrollbar-thin`}
        >
          <CVEditor doc={doc} onChange={update} />
        </aside>

        {/* Preview */}
        <section
          className={`md:block ${mobileTab === 'preview' ? 'block' : 'hidden'}`}
        >
          <div className="md:sticky md:top-[4.5rem]">
            <div className="rounded-xl border border-border bg-surface p-2 sm:p-4 md:max-h-[calc(100vh-9rem)] md:overflow-y-auto scrollbar-thin">
              <div
                ref={previewRef}
                className="rounded-md overflow-hidden mx-auto shadow-[var(--shadow-card)]"
                style={{ maxWidth: '820px' }}
              >
                <Template data={doc.data} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
