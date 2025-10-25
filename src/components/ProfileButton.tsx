'use client'

import { useState } from 'react'
import { User, LogOut, LogIn } from 'lucide-react'
import { useApp } from '@/app/providers'
import { createSupabaseClient } from '@/lib/supabase'

export function ProfileButton() {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useApp()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    console.log('Sign in button clicked')
    setIsLoading(true)
    
    try {
      console.log('Creating Supabase client...')
      const supabase = createSupabaseClient()
      
      console.log('Starting OAuth sign in...')
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      
      console.log('OAuth response:', { data, error })
      
      if (error) {
        console.error('Sign in error:', error)
        alert(`Sign in failed: ${error.message}`)
        return
      }
      
      console.log('OAuth redirect URL:', data.url)
      
      // If we get a URL, redirect to it
      if (data.url) {
        console.log('Redirecting to OAuth URL...')
        window.location.href = data.url
      } else {
        console.error('No redirect URL received')
        alert('No redirect URL received from OAuth provider')
      }
    } catch (error) {
      console.error('Sign in error:', error)
      alert(`Sign in failed: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleProfileClick = async () => {
    console.log('Profile button clicked')
    console.log('isAuthenticated:', isAuthenticated)
    console.log('user:', user)
    
    if (isAuthenticated && user) {
      console.log('User is authenticated, redirecting to profile')
      // If authenticated, redirect to profile page
      window.location.href = '/profile'
      return
    }

    // If not authenticated, start OAuth flow
    await handleSignIn()
  }

  const handleSignOut = async (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent profile click when signing out
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
      onClick={handleProfileClick}
      disabled={isLoading}
      className="flex items-center space-x-2 text-gray-700 hover:text-amber-600 transition-colors disabled:opacity-50"
    >
      <User className="w-5 h-5" />
          <span>{isLoading ? 'Signing in...' : 'Profile'}</span>
    </button>
  )
}
