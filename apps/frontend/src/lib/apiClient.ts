import axios from 'axios'

export const API_BASES = [
  'https://cv-makers-backend.bdalrhmnmtwq53.workers.dev',
  'http://localhost:3000',
  'http://localhost:8080',
  'http://localhost:5173',
  'http://localhost:4173',
] as const

export const apiClient = axios.create({
  baseURL: API_BASES[0],
  headers: {
    'Content-Type': 'application/json',
  },
})
