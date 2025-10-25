'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, User } from 'lucide-react'
import { useApp } from '@/app/providers'

export default function SimpleProfilePage() {
  const { isAuthenticated, user } = useApp()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('=== SIMPLE PROFILE PAGE LOAD ===')
    console.log('isAuthenticated:', isAuthenticated)
    console.log('user:', user?.email || 'none')
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [isAuthenticated, user])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">☯</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">I Ching Divination</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Profile</h1>
            <p className="text-gray-600">
              {isAuthenticated ? 'Welcome to your profile!' : 'Please sign in to access your profile'}
            </p>
          </div>
        </div>

        {/* Authentication Status */}
        {isAuthenticated && user ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-3">
              <User className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-1">Authentication Successful!</h3>
                <p className="text-green-700 mb-2">
                  You are signed in as: <strong>{user.email}</strong>
                </p>
                <p className="text-green-700">
                  User ID: <code className="bg-green-100 px-2 py-1 rounded text-sm">{user.id}</code>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-3">
              <User className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-1">Not Authenticated</h3>
                <p className="text-blue-700 mb-4">
                  You need to sign in to access your profile features.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Go Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Debug Information */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Debug Information</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Authentication Status:</strong> {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</p>
            <p><strong>User Email:</strong> {user?.email || 'None'}</p>
            <p><strong>User ID:</strong> {user?.id || 'None'}</p>
            <p><strong>Page Loaded:</strong> {new Date().toLocaleString()}</p>
          </div>
        </div>
      </main>
    </div>
  )
}
