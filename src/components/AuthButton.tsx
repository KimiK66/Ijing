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
      const supabase = createSupabaseClient()
      
      console.log('Starting OAuth sign-in...')
      console.log('Current URL:', window.location.origin)
      console.log('Redirect URL:', `${window.location.origin}/auth/callback`)
      console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
      
      // Use the newer signInWithOAuth method with proper PKCE handling
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          skipBrowserRedirect: false
        }
      })
      
      if (error) {
        console.error('Sign in error:', error)
        alert(`Sign in error: ${error.message}`)
        throw error
      }
      
      console.log('OAuth redirect initiated:', data)
      
      // If we get here, the redirect should happen automatically
      if (data?.url) {
        console.log('Redirecting to:', data.url)
        window.location.href = data.url
      } else {
        console.error('No redirect URL received from Supabase')
        alert('No redirect URL received from Supabase')
      }
      
    } catch (error) {
      console.error('Sign in error:', error)
      alert(`Sign in failed: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      const supabase = createSupabaseClient()
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Sign out error:', error)
        throw error
      }
      
      setUser(null)
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Sign out error:', error)
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
