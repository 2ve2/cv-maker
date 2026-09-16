import type { CVData } from '@/types/cv'
import { ExternalLink } from './shared'

interface Props {
  data: CVData
}

export default function ClassicTemplate({ data }: Props) {
  const { personal, summary, experience, education, skills, languages, certificates, projects } = data

  return (
    <div className="min-h-screen bg-white font-serif text-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center border-b-2 border-gray-900 pb-6 mb-6">
          {personal.profilePhoto && (
            <img
              src={personal.profilePhoto}
              alt={personal.fullName}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 object-cover border-2 border-gray-200"
            />
          )}
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900">
            {personal.fullName || 'Your Name'}
          </h1>
          <p className="text-base sm:text-lg text-gray-500 italic mt-1">
            {personal.jobTitle || 'Job Title'}
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3 text-sm text-gray-400">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.city && <span>{personal.city}</span>}
            {personal.linkedinUrl && (
              <ExternalLink href={personal.linkedinUrl} className="text-gray-500 hover:text-gray-900 transition-colors">
                LinkedIn
              </ExternalLink>
            )}
            {personal.githubUrl && (
              <ExternalLink href={personal.githubUrl} className="text-gray-500 hover:text-gray-900 transition-colors">
                GitHub
              </ExternalLink>
            )}
          </div>
        </header>

        {/* Summary */}
        {summary && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-1 mb-3">
              Profile
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-1 mb-3">
              Experience
            </h2>
            <div className="space-y-5">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{exp.role}</h3>
                      <p className="text-sm text-gray-500">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">
                      {exp.from} — {exp.current ? 'Present' : exp.to}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-gray-600 leading-relaxed mt-1">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-1 mb-3">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-sm text-gray-500">{edu.university}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-1 mb-3">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-1 mb-3">
              Languages
            </h2>
            <div className="flex flex-wrap gap-4">
              {languages.map((lang) => (
                <div key={lang.id} className="text-sm">
                  <span className="font-semibold text-gray-900">{lang.name}</span>
                  <span className="text-gray-400 ml-1">— {lang.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certificates */}
        {certificates.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-1 mb-3">
              Certificates
            </h2>
            <div className="space-y-3">
              {certificates.map((cert) => (
                <div key={cert.id} className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{cert.name}</h3>
                    <p className="text-sm text-gray-500">
                      {cert.issuer}{cert.date ? ` • ${cert.date}` : ''}
                    </p>
                    {cert.credentialId && (
                      <p className="text-xs text-gray-400 mt-0.5">ID: {cert.credentialId}</p>
                    )}
                  </div>
                  {cert.url && (
                    <ExternalLink
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-400 hover:text-gray-900 transition-colors whitespace-nowrap shrink-0"
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
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-1 mb-3">
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-900">{proj.title}</h3>
                    {proj.url && (
                      <ExternalLink
                        href={proj.url}
                        className="text-xs text-gray-400 hover:text-gray-900 transition-colors"
                      >
                        ↗ link
                      </ExternalLink>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mt-1">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}