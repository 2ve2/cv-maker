import { type CVDocument, type CVData, uid } from '@/types/cv'
import { TEMPLATES } from './templates/registry'
import { Trash2, Plus } from 'lucide-react'

interface Props {
  doc: CVDocument
  onChange: (updater: (d: CVDocument) => CVDocument) => void
}

const inputCls =
  'w-full rounded-md bg-input border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition'
const labelCls = 'block text-xs font-medium text-muted-foreground mb-1.5'
const sectionCls = 'rounded-xl bg-card border border-border p-5'
const sectionTitle = 'text-sm font-semibold text-foreground mb-4 flex items-center justify-between'
const subBtn =
  'inline-flex items-center gap-1.5 rounded-md bg-secondary hover:bg-accent text-secondary-foreground text-xs font-medium px-3 py-1.5 transition'
const dangerBtn =
  'inline-flex items-center justify-center rounded-md p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition'

export function CVEditor({ doc, onChange }: Props) {
  const setData = (mut: (d: CVData) => CVData) =>
    onChange((prev) => ({ ...prev, data: mut(prev.data) }))

  return (
    <div className="space-y-5">
      {/* Title + template */}
      <div className={sectionCls}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>CV Title</label>
            <input
              className={inputCls}
              value={doc.title}
              onChange={(e) => onChange((p) => ({ ...p, title: e.target.value }))}
              placeholder="My professional CV"
            />
          </div>
          <div>
            <label className={labelCls}>Template</label>
            <select
              className={inputCls}
              value={doc.template}
              onChange={(e) =>
                onChange((p) => ({ ...p, template: e.target.value as CVDocument['template'] }))
              }
            >
              {TEMPLATES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Personal */}
      <div className={sectionCls}>
        <h3 className={sectionTitle}>Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(
            [
              ['fullName', 'Full Name', 'Jane Doe'],
              ['jobTitle', 'Job Title', 'Senior Designer'],
              ['email', 'Email', 'jane@example.com'],
              ['phone', 'Phone', '+1 555 0100'],
              ['city', 'City', 'San Francisco'],
              ['linkedinUrl', 'LinkedIn URL', 'https://linkedin.com/in/jane'],
              ['githubUrl', 'GitHub URL', 'https://github.com/jane'],
              ['profilePhoto', 'Profile Photo URL', 'https://...'],
            ] as const
          ).map(([key, label, ph]) => (
            <div key={key} className={key === 'profilePhoto' ? 'sm:col-span-2' : ''}>
              <label className={labelCls}>{label}</label>
              <input
                className={inputCls}
                placeholder={ph}
                value={doc.data.personal[key]}
                onChange={(e) =>
                  setData((d) => ({ ...d, personal: { ...d.personal, [key]: e.target.value } }))
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className={sectionCls}>
        <h3 className={sectionTitle}>Professional Summary</h3>
        <textarea
          rows={4}
          className={inputCls}
          placeholder="A short paragraph about you..."
          value={doc.data.summary}
          onChange={(e) => setData((d) => ({ ...d, summary: e.target.value }))}
        />
      </div>

      {/* Experience */}
      <div className={sectionCls}>
        <h3 className={sectionTitle}>
          Experience
          <button
            className={subBtn}
            onClick={() =>
              setData((d) => ({
                ...d,
                experience: [
                  ...d.experience,
                  {
                    id: uid(),
                    role: '',
                    company: '',
                    from: '',
                    to: '',
                    current: false,
                    description: '',
                  },
                ],
              }))
            }
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </h3>
        <div className="space-y-4">
          {doc.data.experience.map((exp, idx) => (
            <div key={exp.id} className="rounded-lg bg-surface-2 p-4 space-y-2 border border-border">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-medium text-muted-foreground">#{idx + 1}</span>
                <button
                  className={dangerBtn}
                  onClick={() =>
                    setData((d) => ({
                      ...d,
                      experience: d.experience.filter((e) => e.id !== exp.id),
                    }))
                  }
                  aria-label="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  className={inputCls}
                  placeholder="Role"
                  value={exp.role}
                  onChange={(e) =>
                    setData((d) => ({
                      ...d,
                      experience: d.experience.map((x) =>
                        x.id === exp.id ? { ...x, role: e.target.value } : x,
                      ),
                    }))
                  }
                />
                <input
                  className={inputCls}
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) =>
                    setData((d) => ({
                      ...d,
                      experience: d.experience.map((x) =>
                        x.id === exp.id ? { ...x, company: e.target.value } : x,
                      ),
                    }))
                  }
                />
                <input
                  className={inputCls}
                  placeholder="From (e.g. 2022)"
                  value={exp.from}
                  onChange={(e) =>
                    setData((d) => ({
                      ...d,
                      experience: d.experience.map((x) =>
                        x.id === exp.id ? { ...x, from: e.target.value } : x,
                      ),
                    }))
                  }
                />
                <input
                  className={inputCls}
                  placeholder="To (e.g. 2024)"
                  disabled={exp.current}
                  value={exp.to}
                  onChange={(e) =>
                    setData((d) => ({
                      ...d,
                      experience: d.experience.map((x) =>
                        x.id === exp.id ? { ...x, to: e.target.value } : x,
                      ),
                    }))
                  }
                />
              </div>
              <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) =>
                    setData((d) => ({
                      ...d,
                      experience: d.experience.map((x) =>
                        x.id === exp.id ? { ...x, current: e.target.checked } : x,
                      ),
                    }))
                  }
                />
                I currently work here
              </label>
              <textarea
                rows={3}
                className={inputCls}
                placeholder="Describe your responsibilities and achievements..."
                value={exp.description}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    experience: d.experience.map((x) =>
                      x.id === exp.id ? { ...x, description: e.target.value } : x,
                    ),
                  }))
                }
              />
            </div>
          ))}
          {doc.data.experience.length === 0 && (
            <p className="text-xs text-muted-foreground">No experience added yet.</p>
          )}
        </div>
      </div>

      {/* Education */}
      <div className={sectionCls}>
        <h3 className={sectionTitle}>
          Education
          <button
            className={subBtn}
            onClick={() =>
              setData((d) => ({
                ...d,
                education: [
                  ...d.education,
                  { id: uid(), degree: '', university: '', year: '' },
                ],
              }))
            }
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </h3>
        <div className="space-y-3">
          {doc.data.education.map((ed) => (
            <div key={ed.id} className="rounded-lg bg-surface-2 p-3 border border-border space-y-2">
              <div className="flex justify-end">
                <button
                  className={dangerBtn}
                  onClick={() =>
                    setData((d) => ({
                      ...d,
                      education: d.education.filter((x) => x.id !== ed.id),
                    }))
                  }
                  aria-label="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  className={inputCls}
                  placeholder="Degree"
                  value={ed.degree}
                  onChange={(e) =>
                    setData((d) => ({
                      ...d,
                      education: d.education.map((x) =>
                        x.id === ed.id ? { ...x, degree: e.target.value } : x,
                      ),
                    }))
                  }
                />
                <input
                  className={inputCls}
                  placeholder="University"
                  value={ed.university}
                  onChange={(e) =>
                    setData((d) => ({
                      ...d,
                      education: d.education.map((x) =>
                        x.id === ed.id ? { ...x, university: e.target.value } : x,
                      ),
                    }))
                  }
                />
                <input
                  className={inputCls}
                  placeholder="Year"
                  value={ed.year}
                  onChange={(e) =>
                    setData((d) => ({
                      ...d,
                      education: d.education.map((x) =>
                        x.id === ed.id ? { ...x, year: e.target.value } : x,
                      ),
                    }))
                  }
                />
              </div>
            </div>
          ))}
          {doc.data.education.length === 0 && (
            <p className="text-xs text-muted-foreground">No education added yet.</p>
          )}
        </div>
      </div>

      {/* Skills */}
      <div className={sectionCls}>
        <h3 className={sectionTitle}>
          Skills
          <button
            className={subBtn}
            onClick={() =>
              setData((d) => ({ ...d, skills: [...d.skills, { id: uid(), name: '' }] }))
            }
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {doc.data.skills.map((s) => (
            <div key={s.id} className="flex items-center gap-1">
              <input
                className={inputCls}
                placeholder="e.g. React"
                value={s.name}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    skills: d.skills.map((x) =>
                      x.id === s.id ? { ...x, name: e.target.value } : x,
                    ),
                  }))
                }
              />
              <button
                className={dangerBtn}
                onClick={() =>
                  setData((d) => ({ ...d, skills: d.skills.filter((x) => x.id !== s.id) }))
                }
                aria-label="Remove"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className={sectionCls}>
        <h3 className={sectionTitle}>
          Languages
          <button
            className={subBtn}
            onClick={() =>
              setData((d) => ({
                ...d,
                languages: [...d.languages, { id: uid(), name: '', level: 'Intermediate' }],
              }))
            }
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </h3>
        <div className="space-y-2">
          {doc.data.languages.map((l) => (
            <div key={l.id} className="grid grid-cols-[1fr_180px_auto] gap-2 items-center">
              <input
                className={inputCls}
                placeholder="Language"
                value={l.name}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    languages: d.languages.map((x) =>
                      x.id === l.id ? { ...x, name: e.target.value } : x,
                    ),
                  }))
                }
              />
              <select
                className={inputCls}
                value={l.level}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    languages: d.languages.map((x) =>
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      x.id === l.id ? { ...x, level: e.target.value as any } : x,
                    ),
                  }))
                }
              >
                <option>Basic</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Native</option>
              </select>
              <button
                className={dangerBtn}
                onClick={() =>
                  setData((d) => ({ ...d, languages: d.languages.filter((x) => x.id !== l.id) }))
                }
                aria-label="Remove"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Certificates */}
      <div className={sectionCls}>
        <h3 className={sectionTitle}>
          Certificates
          <button
            className={subBtn}
            onClick={() =>
              setData((d) => ({
                ...d,
                certificates: [
                  ...d.certificates,
                  { id: uid(), name: '', issuer: '', date: '', credentialId: '', url: '' },
                ],
              }))
            }
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </h3>
        <div className="space-y-3">
          {doc.data.certificates.map((c) => (
            <div key={c.id} className="rounded-lg bg-surface-2 p-3 border border-border space-y-2">
              <div className="flex justify-end">
                <button
                  className={dangerBtn}
                  onClick={() =>
                    setData((d) => ({
                      ...d,
                      certificates: d.certificates.filter((x) => x.id !== c.id),
                    }))
                  }
                  aria-label="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(
                  [
                    ['name', 'Certificate name'],
                    ['issuer', 'Issuer'],
                    ['date', 'Date'],
                    ['credentialId', 'Credential ID'],
                  ] as const
                ).map(([k, ph]) => (
                  <input
                    key={k}
                    className={inputCls}
                    placeholder={ph}
                    value={c[k]}
                    onChange={(e) =>
                      setData((d) => ({
                        ...d,
                        certificates: d.certificates.map((x) =>
                          x.id === c.id ? { ...x, [k]: e.target.value } : x,
                        ),
                      }))
                    }
                  />
                ))}
                <input
                  className={`${inputCls} sm:col-span-2`}
                  placeholder="Verification URL"
                  value={c.url}
                  onChange={(e) =>
                    setData((d) => ({
                      ...d,
                      certificates: d.certificates.map((x) =>
                        x.id === c.id ? { ...x, url: e.target.value } : x,
                      ),
                    }))
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className={sectionCls}>
        <h3 className={sectionTitle}>
          Projects
          <button
            className={subBtn}
            onClick={() =>
              setData((d) => ({
                ...d,
                projects: [
                  ...d.projects,
                  { id: uid(), title: '', description: '', url: '' },
                ],
              }))
            }
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </h3>
        <div className="space-y-3">
          {doc.data.projects.map((p) => (
            <div key={p.id} className="rounded-lg bg-surface-2 p-3 border border-border space-y-2">
              <div className="flex justify-end">
                <button
                  className={dangerBtn}
                  onClick={() =>
                    setData((d) => ({ ...d, projects: d.projects.filter((x) => x.id !== p.id) }))
                  }
                  aria-label="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <input
                className={inputCls}
                placeholder="Project title"
                value={p.title}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    projects: d.projects.map((x) =>
                      x.id === p.id ? { ...x, title: e.target.value } : x,
                    ),
                  }))
                }
              />
              <input
                className={inputCls}
                placeholder="URL"
                value={p.url}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    projects: d.projects.map((x) =>
                      x.id === p.id ? { ...x, url: e.target.value } : x,
                    ),
                  }))
                }
              />
              <textarea
                rows={2}
                className={inputCls}
                placeholder="Description"
                value={p.description}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    projects: d.projects.map((x) =>
                      x.id === p.id ? { ...x, description: e.target.value } : x,
                    ),
                  }))
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
