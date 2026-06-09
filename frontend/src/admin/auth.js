// Tiny auth helper backed by localStorage.
export function getToken() {
  return localStorage.getItem('loomx_token')
}

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem('loomx_user') || 'null')
  } catch {
    return null
  }
}

export function saveAuth({ token, username, role }) {
  localStorage.setItem('loomx_token', token)
  localStorage.setItem('loomx_user', JSON.stringify({ username, role }))
}

export function clearAuth() {
  localStorage.removeItem('loomx_token')
  localStorage.removeItem('loomx_user')
}

export function isAuthenticated() {
  return !!getToken()
}
