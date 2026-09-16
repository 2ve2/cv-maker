export interface Project {
  id: string
  title: string
  content: ProjectContent
  createdAt: string
}

export interface ProjectContent {
  template: string
  data: Record<string, unknown>
}

export interface ProjectCreateInput {
  title: string
  content: unknown
}

export interface ProjectsListParams {
  limit?: number
  offset?: number
  order?: 'asc' | 'desc'
  qTitle?: string
}

export interface ProjectsListResponse {
  projects: Project[]
  pagination: {
    total: number
    limit: number
    offset: number
    hasMore: boolean
  }
}

export interface ApiResponse<T> {
  status: true
  message?: string
  result: T
}
