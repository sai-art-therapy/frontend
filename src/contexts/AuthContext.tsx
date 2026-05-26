import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface AuthContextType {
  token: string | null
  isAuthenticated: boolean
  setToken: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(
    () => localStorage.getItem('access_token')
  )

  const setToken = (newToken: string) => {
    localStorage.setItem('access_token', newToken)
    setTokenState(newToken)
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    setTokenState(null)
  }

  useEffect(() => {
    const stored = localStorage.getItem('access_token')
    if (stored) setTokenState(stored)
  }, [])

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
