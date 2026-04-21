import { Link, useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { SiteHeader } from '@/components/SiteHeader'
import { projectsService } from '@/lib/projectsService'
import { getTemplate } from '@/components/templates/registry'
import { type CVData, type TemplateId, emptyCV } from '@/types/cv'
import { exportElementToPdf } from '@/lib/pdf'
import { Download, Loader2, ArrowLeft } from 'lucide-react'
import { useRef, useState } from 'react'

export function CVViewPage() {
  const { id } = useParams<{ id: string }>()
  const [pdfBusy, setPdfBusy] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  const { data, isLoading, error } = useQuery({
    queryKey: ['project', id],
    queryFn: () => projectsService.getProjectById(id!),
    enabled: !!id,
  })

  const project = data?.result.project

  const template: TemplateId = (project?.content?.template as TemplateId) || 'dark'
  const cvData: CVData = (project?.content?.data as unknown as CVData) || emptyCV().data
  const Template = getTemplate(template).Component

  const handleExport = async () => {
    if (!previewRef.current || !project) return
    setPdfBusy(true)
    try {
      await exportElementToPdf(previewRef.current, project.title || 'cv')
    } finally {
      setPdfBusy(false)
    }
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <Link
            to="/cvs"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="h-4 w-4" /> All CVs
          </Link>
          {project && (
            <button
              onClick={handleExport}
              disabled={pdfBusy}
              className="inline-flex items-center gap-1.5 rounded-md bg-[image:var(--gradient-primary)] text-primary-foreground text-xs font-semibold px-3 py-2 shadow-[var(--shadow-glow)] hover:opacity-90 transition disabled:opacity-60"
            >
              {pdfBusy ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Download className="h-3.5 w-3.5" />
              )}
              Download PDF
            </button>
          )}
        </div>

        {error && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            {error instanceof Error ? error.message : 'Failed to load'}
          </div>
        )}

        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading CV...
          </div>
        )}

        {project && (
          <>
            <h1 className="text-2xl font-bold mb-1">{project.title}</h1>
            <p className="text-xs text-muted-foreground mb-5">
              Published {new Date(project.createdAt).toLocaleString()}
            </p>
            <div className="rounded-xl border border-border bg-surface p-2 sm:p-4">
              <div
                ref={previewRef}
                className="rounded-md overflow-hidden mx-auto shadow-[var(--shadow-card)]"
                style={{ maxWidth: '820px' }}
              >
                <Template data={cvData} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
