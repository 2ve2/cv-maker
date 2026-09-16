import { TemplateInitials, ExternalLink } from './shared'
import type { CVData } from '@/types/cv'

interface Props {
  data: CVData
}

export default function ModernTemplate({ data }: Props) {
  const { personal, summary, experience, education, skills, languages, certificates, projects } = data

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr]">

          {/* Sidebar */}
          <aside className="bg-slate-900 text-white md:min-h-screen px-6 sm:px-7 py-8 sm:py-10">

            {/* Avatar */}
            <div className="mb-7 text-center">
              {personal.profilePhoto ? (
                <img
                  src={personal.profilePhoto}
                  alt={personal.fullName}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto object-cover border-2 border-indigo-400"
                />
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto bg-indigo-500 flex items-center justify-center text-2xl sm:text-3xl font-bold text-white">
                  <TemplateInitials name={personal.fullName || 'CV'} />
                </div>
              )}
              <h1 className="text-lg sm:text-xl font-bold mt-4 leading-tight">
                {personal.fullName || 'Your Name'}
              </h1>
              <p className="text-indigo-300 text-sm mt-1">
                {personal.jobTitle || 'Job Title'}
              </p>
            </div>

            {/* Contact */}
            <div className="mb-7">
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">
                Contact
              </h2>
              <ul className="space-y-2.5 text-sm text-slate-300">
                {personal.email && (
                  <li className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-indigo-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    <span className="break-all">{personal.email}</span>
                  </li>
                )}
                {personal.phone && (
                  <li className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-indigo-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <span>{personal.phone}</span>
                  </li>
                )}
                {personal.city && (
                  <li className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-indigo-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span>{personal.city}</span>
                  </li>
                )}
                {personal.linkedinUrl && (
                  <li className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-indigo-400 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    <ExternalLink href={personal.linkedinUrl} className="text-indigo-300 hover:text-white transition-colors text-xs break-all">
                      LinkedIn
                    </ExternalLink>
                  </li>
                )}
                {personal.githubUrl && (
                  <li className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-indigo-400 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                    <ExternalLink href={personal.githubUrl} className="text-indigo-300 hover:text-white transition-colors text-xs">
                      GitHub
                    </ExternalLink>
                  </li>
                )}
              </ul>
            </div>

            {/* Skills */}
            {skills.length > 0 && (
              <div className="mb-7">
                <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="text-xs px-2 py-1 bg-indigo-500/20 text-indigo-200 rounded-full border border-indigo-500/30"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div className="mb-7">
                <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">
                  Languages
                </h2>
                <ul className="space-y-2">
                  {languages.map((lang) => (
                    <li key={lang.id} className="text-sm">
                      <span className="text-white font-medium">{lang.name}</span>
                      <span className="text-slate-400 text-xs ml-2">{lang.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </aside>

          {/* Main Content */}
          <main className="px-5 sm:px-8 py-8 sm:py-10">

            {/* Summary */}
            {summary && (
              <section className="mb-8">
                <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-3">
                  About
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
              </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-4">
                  Experience
                </h2>
                <div className="space-y-6">
                  {experience.map((exp) => (
                    <div key={exp.id} className="relative pl-4 border-l-2 border-indigo-100">
                      <div className="absolute -left-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-400" />
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-bold text-gray-900">{exp.role}</h3>
                          <p className="text-sm text-indigo-500 font-medium">{exp.company}</p>
                        </div>
                        <span className="text-xs text-gray-400 whitespace-nowrap shrink-0 mt-0.5">
                          {exp.from} — {exp.current ? 'Present' : exp.to}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="text-sm text-gray-600 leading-relaxed mt-2">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-4">
                  Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="relative pl-4 border-l-2 border-indigo-100">
                      <div className="absolute -left-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-400" />
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-bold text-gray-900">{edu.degree}</h3>
                          <p className="text-sm text-gray-500">{edu.university}</p>
                        </div>
                        <span className="text-xs text-gray-400 whitespace-nowrap shrink-0 mt-0.5">
                          {edu.year}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certificates */}
            {certificates.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-4">
                  Certificates
                </h2>
                <div className="space-y-4">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="relative pl-4 border-l-2 border-indigo-100">
                      <div className="absolute -left-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-400" />
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-bold text-gray-900">{cert.name}</h3>
                          <p className="text-sm text-indigo-500 font-medium">{cert.issuer}</p>
                          {cert.credentialId && (
                            <p className="text-xs text-gray-400 mt-0.5">ID: {cert.credentialId}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          {cert.date && (
                            <span className="text-xs text-gray-400 whitespace-nowrap">{cert.date}</span>
                          )}
                          {cert.url && (
                            <ExternalLink href={cert.url} className="text-xs text-indigo-400 hover:text-indigo-600 transition-colors">
                              ↗ verify
                            </ExternalLink>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-4">
                  Projects
                </h2>
                <div className="space-y-4">
                  {projects.map((proj) => (
                    <div key={proj.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-bold text-gray-900">{proj.title}</h3>
                        {proj.url && (
                          <ExternalLink href={proj.url} className="text-xs text-indigo-400 hover:text-indigo-600 transition-colors">
                            ↗
                          </ExternalLink>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </main>
        </div>
      </div>
    </div>
  )
}