'use client'

import { useState } from 'react'
import { User } from 'lucide-react'

export function SimpleProfileButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    console.log('Simple Profile button clicked')
    setIsLoading(true)
    
    // Simple redirect to simple profile page for testing
    setTimeout(() => {
      window.location.href = '/profile/simple'
    }, 1000)
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="flex items-center space-x-2 text-gray-700 hover:text-amber-600 transition-colors disabled:opacity-50"
    >
      <User className="w-5 h-5" />
      <span>{isLoading ? 'Loading...' : 'Profile'}</span>
    </button>
  )
}
