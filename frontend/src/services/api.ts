/// <reference types="vite/client" />
/// <reference types="vite/client" />
// src/services/api.ts
import axios from 'axios'

// In development, use Vite's proxy so the browser talks to the same origin.
// Production builds use the explicitly configured API URL (or the same-origin proxy).
const BASE = import.meta.env.DEV
  ? '/api'
  : (import.meta.env.VITE_API_URL as string | undefined) ?? '/api'

const api = axios.create({ baseURL: BASE })

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('rms_token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

api.interceptors.response.use(
  r => r,
  err => {
    const requestUrl = (err as { config?: { url?: string } }).config?.url
    const isLoginRequest = requestUrl?.replace(/\/$/, '').endsWith('/auth/login')
    if (!isLoginRequest && (err as { response?: { status?: number } }).response?.status === 401) {
      localStorage.removeItem('rms_token')
      localStorage.removeItem('rms_user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
