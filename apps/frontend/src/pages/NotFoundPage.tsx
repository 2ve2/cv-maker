import { Link } from 'react-router'
import { FileText, Home } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Glowing 404 */}
        <div className="relative inline-block mb-8">
          <h1 className="text-[8rem] sm:text-[10rem] font-black leading-none bg-clip-text text-transparent bg-[image:var(--gradient-primary)]">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl opacity-20 bg-[image:var(--gradient-primary)]" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          Page not found
        </h2>
        <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved. Don't worry, let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90 transition"
          >
            <Home className="h-4 w-4" /> Go home
          </Link>
          <Link
            to="/editor"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-medium text-foreground hover:bg-accent transition"
          >
            <FileText className="h-4 w-4" /> Open editor
          </Link>
        </div>
      </div>
    </div>
  )
}
