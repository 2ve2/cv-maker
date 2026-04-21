import { TemplateInitials, ExternalLink } from './shared'
import type { CVData } from '@/types/cv'

interface Props {
  data: CVData
}

const ACCENT = '#FF5C5C'
const ACCENT2 = '#FFB800'
const ACCENT3 = '#00C896'

export default function VibrantTemplate({ data }: Props) {
  const { personal, summary, experience, education, skills, languages, certificates, projects } = data

  return (
    <div className="min-h-screen bg-[#FFFBF5] font-sans text-gray-900">

      {/* Top accent bar */}
      <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2}, ${ACCENT3})` }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-12">

        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-8 mb-10 sm:mb-12">
          <div className="flex-1">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
              style={{ background: '#FFF0F0', color: ACCENT }}>
              {personal.city || 'Location'}
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none text-gray-900">
              {personal.fullName || 'Your Name'}
            </h1>
            <p className="text-base sm:text-lg font-semibold mt-2" style={{ color: ACCENT }}>
              {personal.jobTitle || 'Job Title'}
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-4 text-xs text-gray-400">
              {personal.email && <span>{personal.email}</span>}
              {personal.phone && <span>{personal.phone}</span>}
              {personal.linkedinUrl && (
                <ExternalLink href={personal.linkedinUrl} className="hover:text-gray-700 transition-colors">LinkedIn ↗</ExternalLink>
              )}
              {personal.githubUrl && (
                <ExternalLink href={personal.githubUrl} className="hover:text-gray-700 transition-colors">GitHub ↗</ExternalLink>
              )}
            </div>
          </div>

          {personal.profilePhoto ? (
            <img
              src={personal.profilePhoto}
              alt={personal.fullName}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover shrink-0 self-start sm:self-auto"
              style={{ border: `3px solid ${ACCENT}` }}
            />
          ) : (
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center text-xl sm:text-2xl font-black text-white shrink-0 self-start sm:self-auto"
              style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})` }}
            >
              <TemplateInitials name={personal.fullName || 'CV'} />
            </div>
          )}
        </header>

        {/* Summary */}
        {summary && (
          <section className="mb-10 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-8">

          {/* Left — main */}
          <div>

            {/* Experience */}
            {experience.length > 0 && (
              <section className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ background: ACCENT }} />
                  <h2 className="text-xs font-black uppercase tracking-widest text-gray-400">Experience</h2>
                </div>
                <div className="space-y-6">
                  {experience.map((exp, i) => (
                    <div key={exp.id} className="relative pl-6">
                      <div
                        className="absolute left-0 top-1.5 w-2 h-2 rounded-full"
                        style={{ background: i === 0 ? ACCENT : '#E5E7EB' }}
                      />
                      {i < experience.length - 1 && (
                        <div className="absolute left-[3px] top-4 bottom-[-16px] w-px bg-gray-200" />
                      )}
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-bold text-gray-900">{exp.role}</h3>
                          <p className="text-xs font-semibold mt-0.5" style={{ color: ACCENT }}>{exp.company}</p>
                        </div>
                        <span className="text-xs text-gray-400 whitespace-nowrap shrink-0 mt-0.5 px-2 py-0.5 bg-gray-100 rounded-full">
                          {exp.from} — {exp.current ? 'Present' : exp.to}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="text-xs text-gray-500 leading-relaxed mt-1.5">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certificates */}
            {certificates.length > 0 && (
              <section className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ background: ACCENT2 }} />
                  <h2 className="text-xs font-black uppercase tracking-widest text-gray-400">Certificates</h2>
                </div>
                <div className="space-y-4">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-bold text-gray-900">{cert.name}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {cert.issuer}{cert.date ? ` · ${cert.date}` : ''}
                          </p>
                          {cert.credentialId && (
                            <p className="text-xs text-gray-400 mt-0.5">ID: {cert.credentialId}</p>
                          )}
                        </div>
                        {cert.url && (
                          <ExternalLink href={cert.url} className="text-xs font-semibold transition-colors whitespace-nowrap shrink-0" style={{ color: ACCENT2 }}>↗ verify</ExternalLink>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ background: ACCENT3 }} />
                  <h2 className="text-xs font-black uppercase tracking-widest text-gray-400">Projects</h2>
                </div>
                <div className="space-y-4">
                  {projects.map((proj) => (
                    <div key={proj.id} className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-bold text-gray-900">{proj.title}</h3>
                        {proj.url && (
                          <ExternalLink href={proj.url} className="text-xs font-semibold transition-colors" style={{ color: ACCENT3 }}>↗</ExternalLink>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right — sidebar */}
          <div className="space-y-8">

            {/* Skills */}
            {skills.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ background: ACCENT2 }} />
                  <h2 className="text-xs font-black uppercase tracking-widest text-gray-400">Skills</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="text-xs px-2.5 py-1 rounded-lg font-medium"
                      style={{ background: '#FFFBF0', color: '#92600A', border: `1px solid ${ACCENT2}40` }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ background: ACCENT }} />
                  <h2 className="text-xs font-black uppercase tracking-widest text-gray-400">Education</h2>
                </div>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="text-xs font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{edu.university}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ background: ACCENT3 }} />
                  <h2 className="text-xs font-black uppercase tracking-widest text-gray-400">Languages</h2>
                </div>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-700">{lang.name}</span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: '#F0FFF8', color: '#065F46' }}
                      >
                        {lang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}