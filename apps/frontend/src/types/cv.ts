export type TemplateId = 'modern' | 'dark' | 'classic' | 'minimal' | 'executive' | 'vibrant' | 'ats'

export interface Personal {
  fullName: string
  jobTitle: string
  email: string
  phone: string
  city: string
  linkedinUrl: string
  githubUrl: string
  profilePhoto: string
}

export interface Experience {
  id: string
  role: string
  company: string
  from: string
  to: string
  current: boolean
  description: string
}

export interface Education {
  id: string
  degree: string
  university: string
  year: string
}

export interface Skill {
  id: string
  name: string
}

export type LanguageLevel = 'Basic' | 'Intermediate' | 'Advanced' | 'Native'

export interface Language {
  id: string
  name: string
  level: LanguageLevel
}

export interface Certificate {
  id: string
  name: string
  issuer: string
  date: string
  credentialId: string
  url: string
}

export interface ProjectItem {
  id: string
  title: string
  description: string
  url: string
}

export interface CVData {
  personal: Personal
  summary: string
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  languages: Language[]
  certificates: Certificate[]
  projects: ProjectItem[]
}

export interface CVDocument {
  template: TemplateId
  title: string
  data: CVData
}

export const emptyCV = (): CVDocument => ({
  template: 'dark',
  title: 'Untitled CV',
  data: {
    personal: {
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      city: '',
      linkedinUrl: '',
      githubUrl: '',
      profilePhoto: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    languages: [],
    certificates: [],
    projects: [],
  },
})

export const uid = (): string =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36)
