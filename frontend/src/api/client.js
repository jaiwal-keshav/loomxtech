import axios from 'axios'

// If VITE_API_URL is empty, requests go to /api (handled by Vite dev proxy
// in dev, and by the reverse proxy / same origin in production).
const baseURL = import.meta.env.VITE_API_URL || ''

const client = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

// Attach admin JWT (if present) to every request.
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('loomx_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// On 401 from an admin route, clear the token.
client.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      const url = error.config?.url || ''
      if (url.includes('/api/admin')) {
        localStorage.removeItem('loomx_token')
        localStorage.removeItem('loomx_user')
      }
    }
    return Promise.reject(error)
  }
)

export default client
