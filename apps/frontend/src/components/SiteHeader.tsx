import { Link } from 'react-router'
import { FileText } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]">
            <FileText className="h-4 w-4" />
          </span>
          <span>CV Maker</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            to="/editor"
            className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition"
          >
            Editor
          </Link>
          <Link
            to="/cvs"
            className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition"
          >
            Published
          </Link>
        </nav>
      </div>
    </header>
  )
}
