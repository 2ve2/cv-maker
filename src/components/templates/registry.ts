import type * as React from 'react'
import type { TemplateId, CVData } from '@/types/cv'
import ClassicTemplate from './ClassicTemplate'
import DarkTemplate from './DarkTemplate'
import ExecutiveTemplate from './ExecutiveTemplate'
import MinimalTemplate from './MinimalTemplate'
import ModernTemplate from './ModernTemplate'
import VibrantTemplate from './VibrantTemplate'

export interface TemplateMeta {
  id: TemplateId
  name: string
  description: string
  preview: string // small thumb gradient
  Component: (props: { data: CVData }) => React.ReactElement
}

export const TEMPLATES: TemplateMeta[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Sidebar layout with indigo accents',
    preview: 'linear-gradient(135deg,#1E293B 0%,#1E293B 40%,#fff 40%)',
    Component: ModernTemplate,
  },
  {
    id: 'dark',
    name: 'Dark',
    description: 'Minimalist black with violet highlights',
    preview: 'linear-gradient(135deg,#0D0D0D,#7C3AED)',
    Component: DarkTemplate,
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Centered, serif, timeless',
    preview: 'linear-gradient(135deg,#fff,#E5E7EB)',
    Component: ClassicTemplate,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Light, airy, ultra-clean',
    preview: 'linear-gradient(135deg,#fff,#F5F5F5)',
    Component: MinimalTemplate,
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Premium hero with gold accents',
    preview: 'linear-gradient(135deg,#1C1917,#A8956A)',
    Component: ExecutiveTemplate,
  },
  {
    id: 'vibrant',
    name: 'Vibrant',
    description: 'Bold, colorful, playful',
    preview: 'linear-gradient(135deg,#FF5C5C,#FFB800,#00C896)',
    Component: VibrantTemplate,
  },
]

export const getTemplate = (id: TemplateId): TemplateMeta =>
  TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0]
