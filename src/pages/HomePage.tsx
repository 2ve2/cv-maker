import { Link, useNavigate } from 'react-router'
import { SiteHeader } from '@/components/SiteHeader'
import { TEMPLATES } from '@/components/templates/registry'
import { type CVData } from '@/types/cv'
import { ArrowRight, Download, Globe, Sparkles, Layers, FileText } from 'lucide-react'

const sampleData: CVData = {
  personal: {
    fullName: 'Sarah Johnson',
    jobTitle: 'Senior Frontend Engineer',
    email: 'sarah@example.com',
    phone: '+1 555 0123',
    city: 'San Francisco, CA',
    linkedinUrl: 'https://linkedin.com/in/sarah',
    githubUrl: 'https://github.com/sarah',
    profilePhoto: '',
  },
  summary:
    'Passionate frontend engineer with 6+ years of experience building performant web applications using React, TypeScript, and modern tooling.',
  experience: [
    {
      id: '1',
      role: 'Senior Frontend Engineer',
      company: 'TechCorp Inc.',
      from: '2021',
      to: 'Present',
      current: true,
      description: 'Led the redesign of the core product, improving load times by 40% and user engagement by 25%.',
    },
    {
      id: '2',
      role: 'Frontend Developer',
      company: 'StartupXYZ',
      from: '2019',
      to: '2021',
      current: false,
      description: 'Built and shipped the company\'s first SPA from scratch using React and GraphQL.',
    },
  ],
  education: [
    { id: '1', degree: 'B.Sc. Computer Science', university: 'UC Berkeley', year: '2019' },
  ],
  skills: [
    { id: '1', name: 'React' },
    { id: '2', name: 'TypeScript' },
    { id: '3', name: 'Node.js' },
    { id: '4', name: 'Tailwind CSS' },
    { id: '5', name: 'GraphQL' },
  ],
  languages: [
    { id: '1', name: 'English', level: 'Native' },
    { id: '2', name: 'Spanish', level: 'Intermediate' },
  ],
  certificates: [
    { id: '1', name: 'AWS Certified Developer', issuer: 'Amazon', date: '2023', credentialId: '', url: '' },
  ],
  projects: [
    { id: '1', title: 'Open Design System', description: 'A component library used by 2k+ developers.', url: 'https://github.com/example' },
  ],
}

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundImage: 'var(--gradient-hero)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-24 sm:pt-28 sm:pb-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 backdrop-blur px-3 py-1 text-xs text-muted-foreground mb-6">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Free forever · No sign-up required
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight max-w-3xl mx-auto leading-[1.05]">
            Build a CV that{' '}
            <span className="bg-clip-text text-transparent bg-[image:var(--gradient-primary)]">
              opens doors
            </span>
            .
          </h1>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            Six beautifully crafted templates, a real-time editor, instant PDF export, and a public
            link to share with recruiters.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/editor"
              className="inline-flex items-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90 transition"
            >
              Start building <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/cvs"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/40 backdrop-blur px-5 py-3 text-sm font-medium text-foreground hover:bg-accent transition"
            >
              Browse published
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: Layers,
              title: '6 elegant templates',
              text: 'From minimalist serif to vibrant gradients — pick the look that fits you.',
            },
            {
              icon: Download,
              title: 'Export to PDF',
              text: 'High-quality A4 PDF, generated entirely in your browser.',
            },
            {
              icon: Globe,
              title: 'Publish online',
              text: 'Get a shareable link to your CV in one click.',
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[image:var(--gradient-primary)] text-primary-foreground mb-4">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Templates showcase */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Templates Designed to Stand Out
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
              Choose from our collection of professional CV templates. Switch freely — your content stays the same.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
            {TEMPLATES.map((t) => (
              <div
                key={t.id}
                role="button"
                tabIndex={0}
                onClick={() => navigate('/editor')}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate('/editor') } }}
                className="rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50 hover:shadow-[0_12px_40px_-12px_oklch(0.68_0.22_295/0.25)] transition-all duration-300 group hover:-translate-y-1 cursor-pointer"
              >
                {/* Live mini preview */}
                <div className="h-[300px] sm:h-[340px] overflow-hidden relative pointer-events-none">
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 scale-[0.38] sm:scale-[0.42] w-[794px] origin-top"
                    style={{ minHeight: '1123px' }}
                  >
                    <t.Component data={sampleData} />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-glow)]">
                      Use template <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
                {/* Info */}
                <div className="p-5 flex items-center justify-between border-t border-border">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{t.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.description}</p>
                  </div>
                  <span className="shrink-0 px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    Free
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/editor"
              className="inline-flex items-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90 transition"
            >
              Try all templates in the editor <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border mt-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]">
                <FileText className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">CV Maker</p>
                <p className="text-xs text-muted-foreground">Open & free forever.</p>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/lord2ve"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-accent transition"
                aria-label="GitHub"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/lord2ve"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-accent transition"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} CV Maker. Built with ❤️</p>
            <div className="flex items-center gap-4">
              <Link to="/" className="hover:text-foreground transition">Home</Link>
              <Link to="/editor" className="hover:text-foreground transition">Editor</Link>
              <Link to="/cvs" className="hover:text-foreground transition">Published</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
