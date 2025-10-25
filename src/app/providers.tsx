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

  // Initialize Supabase auth state - SAFE MODE for public deployment
  useEffect(() => {
    const supabase = createSupabaseClient()
    
    console.log('Initializing Supabase auth state in SAFE MODE...')
    console.log('No auto-authentication - users must explicitly sign in')
    
    // Clear any existing session for safety
    const clearExistingSession = async () => {
      try {
        const { error } = await supabase.auth.signOut()
        if (error) {
          console.log('No existing session to clear:', error.message)
        } else {
          console.log('Cleared any existing session')
        }
      } catch (error) {
        console.log('Session clear error (expected):', error)
      }
    }
    
    clearExistingSession()
    
    // Set initial state to NOT authenticated
    setUser(null)
    setIsAuthenticated(false)
    
    // Listen for auth changes (only when user explicitly signs in)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('=== AUTH STATE CHANGE ===')
        console.log('Event:', event)
        console.log('Session:', session ? 'present' : 'null')
        console.log('User:', session?.user?.email || 'none')
        
        if (session?.user) {
          console.log('User explicitly signed in:', session.user.email)
          setUser(session.user)
          setIsAuthenticated(true)
        } else {
          console.log('User signed out or no session')
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
