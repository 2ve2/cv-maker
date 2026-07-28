import type { CVData } from '@/types/cv'
import { ExternalLink } from './shared'

interface Props {
  data: CVData
}

export default function ATSTemplate({ data }: Props) {
  const { personal, summary, experience, education, skills, languages, certificates, projects } = data

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-10 py-8 sm:py-12">

        {/* Header */}
        <header className="mb-6 pb-4 border-b-2 border-black">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black uppercase text-center">
            {personal.fullName || 'Your Name'}
          </h1>
          <p className="text-sm text-gray-600 text-center mt-1">
            {personal.jobTitle || 'Job Title'}
          </p>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-3 text-xs text-gray-700">
            {personal.email && <span>{personal.email}</span>}
            {personal.email && personal.phone && <span>|</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.city && <><span>|</span><span>{personal.city}</span></>}
            {personal.linkedinUrl && (
              <>
                <span>|</span>
                <ExternalLink href={personal.linkedinUrl} className="text-black underline">
                  {personal.linkedinUrl.replace('https://', '').replace('www.', '')}
                </ExternalLink>
              </>
            )}
            {personal.githubUrl && (
              <>
                <span>|</span>
                <ExternalLink href={personal.githubUrl} className="text-black underline">
                  {personal.githubUrl.replace('https://', '').replace('www.', '')}
                </ExternalLink>
              </>
            )}
          </div>
        </header>

        {/* Summary */}
        {summary && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-sm text-gray-800 leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-1 mb-3">
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-bold text-black">{exp.role}</h3>
                      <p className="text-sm text-gray-700">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-700 whitespace-nowrap shrink-0 font-medium">
                      {exp.from} – {exp.current ? 'Present' : exp.to}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-gray-800 leading-relaxed mt-1.5 pl-2 border-l-2 border-gray-300">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-1 mb-3">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-black">{edu.degree}</h3>
                    <p className="text-sm text-gray-700">{edu.university}</p>
                  </div>
                  <span className="text-xs text-gray-700 whitespace-nowrap shrink-0 font-medium">
                    {edu.year}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-1 mb-3">
              Skills
            </h2>
            <p className="text-sm text-gray-800 leading-relaxed">
              {skills.map((skill) => skill.name).join(' · ')}
            </p>
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-1 mb-3">
              Languages
            </h2>
            <p className="text-sm text-gray-800">
              {languages.map((lang) => `${lang.name} (${lang.level})`).join(' · ')}
            </p>
          </section>
        )}

        {/* Certificates */}
        {certificates.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-1 mb-3">
              Certifications
            </h2>
            <div className="space-y-3">
              {certificates.map((cert) => (
                <div key={cert.id} className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-black">{cert.name}</h3>
                    <p className="text-sm text-gray-700">
                      {cert.issuer}{cert.date ? ` · ${cert.date}` : ''}
                    </p>
                    {cert.credentialId && (
                      <p className="text-xs text-gray-500 mt-0.5">ID: {cert.credentialId}</p>
                    )}
                  </div>
                  {cert.url && (
                    <ExternalLink
                      href={cert.url}
                      className="text-xs text-black underline whitespace-nowrap shrink-0"
                    >
                      verify ↗
                    </ExternalLink>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-1 mb-3">
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-black">{proj.title}</h3>
                    {proj.url && (
                      <ExternalLink
                        href={proj.url}
                        className="text-xs text-black underline"
                      >
                        link ↗
                      </ExternalLink>
                    )}
                  </div>
                  <p className="text-sm text-gray-800 leading-relaxed mt-1">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}
