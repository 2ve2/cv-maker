import type { CVData } from '@/types/cv'
import { ExternalLink } from './shared'

interface Props {
  data: CVData
}

export default function MinimalTemplate({ data }: Props) {
  const { personal, summary, experience, education, skills, languages, certificates, projects } = data

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <div className="max-w-2xl mx-auto px-5 sm:px-10 py-10 sm:py-16">

        {/* Header */}
        <header className="mb-10 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-8">
            <div>
              <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 leading-none">
                {personal.fullName || 'Your Name'}
              </h1>
              <p className="text-sm uppercase tracking-widest text-gray-400 mt-3">
                {personal.jobTitle || 'Job Title'}
              </p>
            </div>
            {personal.profilePhoto && (
              <img
                src={personal.profilePhoto}
                alt={personal.fullName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover grayscale self-start sm:self-auto"
              />
            )}
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-1 mt-6 text-xs text-gray-400 tracking-wide">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.city && <span>{personal.city}</span>}
            {personal.linkedinUrl && (
              <ExternalLink href={personal.linkedinUrl} className="hover:text-gray-700 transition-colors">
                LinkedIn
              </ExternalLink>
            )}
            {personal.githubUrl && (
              <ExternalLink href={personal.githubUrl} className="hover:text-gray-700 transition-colors">
                GitHub
              </ExternalLink>
            )}
          </div>
        </header>

        {/* Summary */}
        {summary && (
          <section className="mb-10">
            <p className="text-sm text-gray-500 leading-relaxed max-w-lg">
              {summary}
            </p>
          </section>
        )}

        <hr className="border-gray-100 mb-10" />

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xs uppercase tracking-widest text-gray-300 mb-6">
              Experience
            </h2>
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="grid grid-cols-[1fr_auto] gap-4 sm:gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-sm text-gray-400 mt-0.5">{exp.company}</p>
                    {exp.description && (
                      <p className="text-sm text-gray-500 leading-relaxed mt-2">{exp.description}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-300 whitespace-nowrap">
                      {exp.from}
                    </span>
                    <br />
                    <span className="text-xs text-gray-300 whitespace-nowrap">
                      {exp.current ? 'Present' : exp.to}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <hr className="border-gray-100 mb-10" />

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xs uppercase tracking-widest text-gray-300 mb-6">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="grid grid-cols-[1fr_auto] gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-sm text-gray-400 mt-0.5">{edu.university}</p>
                  </div>
                  <span className="text-xs text-gray-300">{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <hr className="border-gray-100 mb-10" />

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xs uppercase tracking-widest text-gray-300 mb-6">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-xs px-3 py-1.5 border border-gray-200 text-gray-500 rounded"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xs uppercase tracking-widest text-gray-300 mb-6">
              Languages
            </h2>
            <div className="flex flex-wrap gap-6">
              {languages.map((lang) => (
                <div key={lang.id}>
                  <span className="text-sm font-medium text-gray-700">{lang.name}</span>
                  <span className="text-xs text-gray-400 ml-2">{lang.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certificates */}
        {certificates.length > 0 && (
          <section className="mb-10">
            <hr className="border-gray-100 mb-10" />
            <h2 className="text-xs uppercase tracking-widest text-gray-300 mb-6">
              Certificates
            </h2>
            <div className="space-y-4">
              {certificates.map((cert) => (
                <div key={cert.id} className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{cert.name}</h3>
                    <p className="text-sm text-gray-400 mt-0.5">
                      {cert.issuer}{cert.date ? ` · ${cert.date}` : ''}
                    </p>
                    {cert.credentialId && (
                      <p className="text-xs text-gray-300 mt-0.5">ID: {cert.credentialId}</p>
                    )}
                  </div>
                  {cert.url && (
                    <ExternalLink
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-300 hover:text-gray-600 transition-colors whitespace-nowrap shrink-0"
                    >
                      ↗ verify
                    </ExternalLink>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-10">
            <hr className="border-gray-100 mb-10" />
            <h2 className="text-xs uppercase tracking-widest text-gray-300 mb-6">
              Projects
            </h2>
            <div className="space-y-6">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-semibold text-gray-900">{proj.title}</h3>
                    {proj.url && (
                      <ExternalLink
                        href={proj.url}
                        className="text-xs text-gray-300 hover:text-gray-600 transition-colors"
                      >
                        ↗
                      </ExternalLink>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mt-1">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}