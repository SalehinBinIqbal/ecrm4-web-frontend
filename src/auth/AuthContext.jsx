import { createContext, useContext, useState } from 'react'

// TODO: replace with a real API call when a backend is available
const STATIC_EMAIL = 'admin@ecrm.com'
const STATIC_PASSWORD = 'admin123'

const AUTH_KEY = 'ecrm_auth'
const USER_KEY = 'ecrm_user'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem(AUTH_KEY) === 'true',
  )

  function login(email, password) {
    const isMatch =
      email.trim().toLowerCase() === STATIC_EMAIL &&
      password === STATIC_PASSWORD

    if (!isMatch) return false

    localStorage.setItem(AUTH_KEY, 'true')
    localStorage.setItem(
      USER_KEY,
      JSON.stringify({ name: 'Arif Hossain', role: 'HQ admin', initials: 'AH' }),
    )
    setIsAuthenticated(true)
    return true
  }

  function logout() {
    localStorage.removeItem(AUTH_KEY)
    localStorage.removeItem(USER_KEY)
    setIsAuthenticated(false)
  }

  function getUser() {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
