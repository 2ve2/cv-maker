import axios from 'axios'

const DEFAULT_BASE = 'http://localhost:3000'

function getApiBase(): string {
  if (typeof window === 'undefined') return DEFAULT_BASE
  return window.localStorage.getItem('cv_api_base') || DEFAULT_BASE
}

export const apiClient = axios.create({
  baseURL: getApiBase(),
  headers: {
    'Content-Type': 'application/json',
  },
})

// Update baseURL dynamically on each request (in case localStorage changed)
apiClient.interceptors.request.use((config) => {
  config.baseURL = getApiBase()
  return config
})
