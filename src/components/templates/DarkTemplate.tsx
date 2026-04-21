import { TemplateInitials, ExternalLink } from './shared'
import type { CVData } from '@/types/cv'

interface Props {
  data: CVData
}

export default function DarkTemplate({ data }: Props) {
  const { personal, summary, experience, education, skills, languages, certificates, projects } = data

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-14">

        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 mb-10 sm:mb-14 pb-8 sm:pb-10 border-b border-white/10">
          {personal.profilePhoto ? (
            <img
              src={personal.profilePhoto}
              alt={personal.fullName}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shrink-0"
            />
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-violet-600 flex items-center justify-center text-xl sm:text-2xl font-bold shrink-0">
                <TemplateInitials name={personal.fullName || 'CV'} />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight truncate">
              {personal.fullName || 'Your Name'}
            </h1>
            <p className="text-violet-400 mt-1 text-sm sm:text-base">
              {personal.jobTitle || 'Job Title'}
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-xs text-white/40">
              {personal.email && <span>{personal.email}</span>}
              {personal.phone && <span>{personal.phone}</span>}
              {personal.city && <span>{personal.city}</span>}
              {personal.linkedinUrl && (
                <ExternalLink href={personal.linkedinUrl} className="hover:text-violet-400 transition-colors">LinkedIn ↗</ExternalLink>
              )}
              {personal.githubUrl && (
                <ExternalLink href={personal.githubUrl} className="hover:text-violet-400 transition-colors">GitHub ↗</ExternalLink>
              )}
            </div>
          </div>
        </header>

        {/* Summary */}
        {summary && (
          <section className="mb-12">
            <p className="text-sm text-white/50 leading-relaxed max-w-xl">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30 mb-6">
              Experience
            </h2>
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="group">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-xs text-violet-400 mt-0.5">{exp.company}</p>
                    </div>
                    <span className="text-xs text-white/25 whitespace-nowrap shrink-0 mt-0.5">
                      {exp.from} — {exp.current ? 'Present' : exp.to}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-xs text-white/40 leading-relaxed mt-2">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Two column bottom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30 mb-6">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-sm font-semibold text-white">{edu.degree}</h3>
                    <p className="text-xs text-white/40 mt-0.5">{edu.university}</p>
                    <p className="text-xs text-white/25 mt-0.5">{edu.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30 mb-6">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 hover:border-violet-500/50 hover:text-violet-300 transition-colors"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Languages */}
        {languages.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30 mb-4">
              Languages
            </h2>
            <div className="flex flex-wrap gap-6">
              {languages.map((lang) => (
                <div key={lang.id} className="text-sm">
                  <span className="text-white/80">{lang.name}</span>
                  <span className="text-white/30 text-xs ml-2">{lang.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certificates */}
        {certificates.length > 0 && (
          <section className="mt-12 pt-10 border-t border-white/10">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30 mb-6">
              Certificates
            </h2>
            <div className="space-y-4">
              {certificates.map((cert) => (
                <div key={cert.id} className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white">{cert.name}</h3>
                    <p className="text-xs text-violet-400 mt-0.5">
                      {cert.issuer}{cert.date ? ` · ${cert.date}` : ''}
                    </p>
                    {cert.credentialId && (
                      <p className="text-xs text-white/25 mt-0.5">ID: {cert.credentialId}</p>
                    )}
                  </div>
                  {cert.url && (
                    <ExternalLink href={cert.url} className="text-violet-400 hover:text-violet-300 text-xs transition-colors whitespace-nowrap shrink-0">↗ verify</ExternalLink>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mt-12 pt-10 border-t border-white/10">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30 mb-6">
              Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/40 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-white">{proj.title}</h3>
                    {proj.url && (
                      <ExternalLink href={proj.url} className="text-violet-400 hover:text-violet-300 text-xs transition-colors">↗</ExternalLink>
                    )}
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}