'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { SupportedLanguage } from '@/types'
import { LANGUAGES } from '@/lib/hexagrams'
import { createSupabaseClient } from '@/lib/supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'

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

  // Initialize Supabase auth state
  useEffect(() => {
    const supabase = createSupabaseClient()
    
    console.log('Initializing Supabase auth state...')
    
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        console.log('Initial session:', session)
        if (error) {
          console.error('Session error:', error)
        }
        if (session?.user) {
          console.log('User found:', session.user)
          setUser(session.user)
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Error getting session:', error)
      }
    }
    
    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('=== AUTH STATE CHANGE ===')
        console.log('Event:', event)
        console.log('Session:', session ? 'present' : 'null')
        console.log('User:', session?.user?.email || 'none')
        
        if (session?.user) {
          console.log('Setting authenticated state to true')
          setUser(session.user)
          setIsAuthenticated(true)
        } else {
          console.log('Setting authenticated state to false')
          setUser(null)
          setIsAuthenticated(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

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
