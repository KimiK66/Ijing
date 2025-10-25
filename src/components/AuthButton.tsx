'use client'

import { useState, useEffect } from 'react'
import { User, LogOut, LogIn } from 'lucide-react'
import { useApp } from '@/app/providers'
import { createSupabaseClient } from '@/lib/supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export function AuthButton() {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useApp()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      console.log('Starting Google OAuth sign in...')
      const supabase = createSupabaseClient()
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
            scope: 'openid email profile'
          }
        }
      })
      
      if (error) {
        console.error('Sign in error:', error)
        alert(`Sign in failed: ${error.message}`)
        return
      }
      
      console.log('OAuth redirect URL:', data.url)
      
      // Redirect to Google OAuth
      if (data.url) {
        window.location.href = data.url
      } else {
        console.error('No redirect URL received')
        alert('Authentication failed: No redirect URL received')
      }
    } catch (error) {
      console.error('Sign in error:', error)
      alert(`Sign in failed: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      console.log('Signing out...')
      const supabase = createSupabaseClient()
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Sign out error:', error)
        alert(`Sign out failed: ${error.message}`)
        throw error
      }
      
      console.log('Sign out successful')
      setUser(null)
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Sign out error:', error)
      alert(`Sign out failed: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            {user.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={user.name || 'User'}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <User className="w-4 h-4 text-white" />
            )}
          </div>
          <span className="text-sm font-medium text-gray-700">
            {user.name || user.email}
          </span>
        </div>
        <button
          onClick={handleSignOut}
          disabled={isLoading}
          className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      <LogIn className="w-4 h-4" />
      <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
    </button>
  )
}
