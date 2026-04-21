import { TemplateInitials, ExternalLink } from './shared'
import type { CVData } from '@/types/cv'

interface Props {
  data: CVData
}

export default function ExecutiveTemplate({ data }: Props) {
  const { personal, summary, experience, education, skills, languages, certificates, projects } = data

  return (
    <div className="min-h-screen bg-[#F8F6F1] font-sans text-gray-900">
      <div className="max-w-3xl mx-auto">

        {/* Hero header */}
        <header className="bg-[#1C1917] text-white px-5 sm:px-10 pt-8 sm:pt-12 pb-8 sm:pb-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A8956A] mb-3">
                Curriculum Vitae
              </p>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none">
                {personal.fullName || 'Your Name'}
              </h1>
              <p className="text-base sm:text-lg text-[#A8956A] font-medium mt-2">
                {personal.jobTitle || 'Job Title'}
              </p>
            </div>
            {personal.profilePhoto ? (
              <img
                src={personal.profilePhoto}
                alt={personal.fullName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shrink-0 border-2 border-[#A8956A] self-start sm:self-auto"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-[#A8956A] flex items-center justify-center text-xl sm:text-2xl font-black text-white shrink-0 self-start sm:self-auto">
                <TemplateInitials name={personal.fullName || 'CV'} />
              </div>
            )}
          </div>

          {/* Contact bar */}
          <div className="flex flex-wrap gap-x-6 gap-y-1 mt-8 pt-6 border-t border-white/10 text-xs text-white/40">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.city && <span>{personal.city}</span>}
            {personal.linkedinUrl && (
              <ExternalLink href={personal.linkedinUrl} className="hover:text-[#A8956A] transition-colors">LinkedIn ↗</ExternalLink>
            )}
            {personal.githubUrl && (
              <ExternalLink href={personal.githubUrl} className="hover:text-[#A8956A] transition-colors">GitHub ↗</ExternalLink>
            )}
          </div>
        </header>

        <div className="px-5 sm:px-10 py-8 sm:py-10">

          {/* Summary */}
          {summary && (
            <section className="mb-10 pb-10 border-b border-[#E2DDD4]">
              <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">{summary}</p>
            </section>
          )}

          <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-8 md:gap-10">

            {/* Left */}
            <div>

              {/* Experience */}
              {experience.length > 0 && (
                <section className="mb-10">
                  <h2 className="text-xs font-black uppercase tracking-[0.18em] text-[#A8956A] mb-6">
                    Professional Experience
                  </h2>
                  <div className="space-y-8">
                    {experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex items-start justify-between gap-4 mb-1">
                          <div>
                            <h3 className="text-sm font-black text-[#1C1917]">{exp.role}</h3>
                            <p className="text-xs font-semibold text-[#A8956A] mt-0.5">{exp.company}</p>
                          </div>
                          <span className="text-xs text-gray-400 whitespace-nowrap shrink-0 mt-0.5">
                            {exp.from} — {exp.current ? 'Present' : exp.to}
                          </span>
                        </div>
                        {exp.description && (
                          <p className="text-xs text-gray-500 leading-relaxed mt-2 border-l-2 border-[#A8956A]/30 pl-3">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Certificates */}
              {certificates.length > 0 && (
                <section className="mb-10">
                  <h2 className="text-xs font-black uppercase tracking-[0.18em] text-[#A8956A] mb-6">
                    Certificates
                  </h2>
                  <div className="space-y-4">
                    {certificates.map((cert) => (
                      <div key={cert.id} className="p-4 bg-white rounded-xl border border-[#E2DDD4]">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-xs font-black text-[#1C1917]">{cert.name}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {cert.issuer}{cert.date ? ` · ${cert.date}` : ''}
                            </p>
                            {cert.credentialId && (
                              <p className="text-xs text-gray-400 mt-0.5">ID: {cert.credentialId}</p>
                            )}
                          </div>
                          {cert.url && (
                            <ExternalLink href={cert.url} className="text-xs text-[#A8956A] hover:text-[#8B7A55] transition-colors whitespace-nowrap shrink-0">↗ verify</ExternalLink>
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
                  <h2 className="text-xs font-black uppercase tracking-[0.18em] text-[#A8956A] mb-6">
                    Selected Projects
                  </h2>
                  <div className="space-y-5">
                    {projects.map((proj) => (
                      <div key={proj.id} className="p-4 bg-white rounded-xl border border-[#E2DDD4]">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xs font-black text-[#1C1917]">{proj.title}</h3>
                          {proj.url && (
                            <ExternalLink href={proj.url} className="text-xs text-[#A8956A] hover:text-[#8B7A55] transition-colors">↗</ExternalLink>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{proj.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right sidebar */}
            <div className="space-y-8">

              {/* Education */}
              {education.length > 0 && (
                <section>
                  <h2 className="text-xs font-black uppercase tracking-[0.18em] text-[#A8956A] mb-4">
                    Education
                  </h2>
                  <div className="space-y-4">
                    {education.map((edu) => (
                      <div key={edu.id} className="pb-4 border-b border-[#E2DDD4] last:border-0 last:pb-0">
                        <h3 className="text-xs font-black text-[#1C1917]">{edu.degree}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{edu.university}</p>
                        <p className="text-xs text-[#A8956A] mt-0.5">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Skills */}
              {skills.length > 0 && (
                <section>
                  <h2 className="text-xs font-black uppercase tracking-[0.18em] text-[#A8956A] mb-4">
                    Core Skills
                  </h2>
                  <div className="space-y-1.5">
                    {skills.map((skill) => (
                      <div key={skill.id} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#A8956A] shrink-0" />
                        <span className="text-xs text-gray-600">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Languages */}
              {languages.length > 0 && (
                <section>
                  <h2 className="text-xs font-black uppercase tracking-[0.18em] text-[#A8956A] mb-4">
                    Languages
                  </h2>
                  <div className="space-y-2">
                    {languages.map((lang) => (
                      <div key={lang.id}>
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-xs font-semibold text-gray-700">{lang.name}</span>
                          <span className="text-xs text-gray-400">{lang.level}</span>
                        </div>
                        <div className="h-0.5 bg-[#E2DDD4] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#A8956A] rounded-full"
                            style={{
                              width:
                                lang.level === 'Native' ? '100%' :
                                lang.level === 'Advanced' ? '80%' :
                                lang.level === 'Intermediate' ? '55%' : '30%'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-4 border-t border-[#E2DDD4]">
          <p className="text-xs text-gray-300 text-center tracking-widest uppercase">
            {personal.fullName} · {personal.jobTitle}
          </p>
        </div>

      </div>
    </div>
  )
}