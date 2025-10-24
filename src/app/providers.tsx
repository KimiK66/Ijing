'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { SupportedLanguage } from '@/types'
import { LANGUAGES } from '@/lib/hexagrams'

interface AppContextType {
  language: SupportedLanguage
  setLanguage: (language: SupportedLanguage) => void
  isAuthenticated: boolean
  setIsAuthenticated: (authenticated: boolean) => void
  user: any | null
  setUser: (user: any | null) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within a Providers component')
  }
  return context
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<SupportedLanguage>('en')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any | null>(null)

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('i-ching-language') as SupportedLanguage
    if (savedLanguage && savedLanguage in LANGUAGES) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('i-ching-language', language)
  }, [language])

  const value = {
    language,
    setLanguage,
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
