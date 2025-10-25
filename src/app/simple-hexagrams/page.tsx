'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, Info } from 'lucide-react'
import { useApp } from '@/app/providers'
import hexagramsData from '@/data/all-64-enhanced-hexagrams.json'

export default function SimpleHexagramsPage() {
  const { language } = useApp()
  const [hexagrams, setHexagrams] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    try {
      console.log('=== SIMPLE HEXAGRAMS PAGE ===')
      console.log('Loading hexagrams data...')
      console.log('Data type:', typeof hexagramsData)
      console.log('Data length:', Array.isArray(hexagramsData) ? hexagramsData.length : 'Not an array')
      
      if (Array.isArray(hexagramsData)) {
        setHexagrams(hexagramsData)
        console.log('Hexagrams loaded successfully:', hexagramsData.length)
        setError('')
      } else {
        setError('Data is not an array')
        console.error('Data is not an array:', hexagramsData)
      }
    } catch (err) {
      console.error('Error loading hexagrams:', err)
      setError(`Error: ${err}`)
    } finally {
      setIsLoading(false)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hexagrams...</p>
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
                href="/about"
                className="flex items-center space-x-2 text-gray-700 hover:text-amber-600 transition-colors"
              >
                <Info className="w-5 h-5" />
                <span>What is I Ching?</span>
              </Link>
              <Link
                href="/profile"
                className="flex items-center space-x-2 text-gray-700 hover:text-amber-600 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                <span>Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse All 64 Hexagrams (Simple Version)
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Testing hexagrams data loading...
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Data Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Data Summary</h2>
          <p><strong>Total hexagrams loaded:</strong> {hexagrams.length}</p>
          <p><strong>Data type:</strong> {typeof hexagrams}</p>
          <p><strong>Is array:</strong> {Array.isArray(hexagrams) ? 'Yes' : 'No'}</p>
          {hexagrams.length > 0 && (
            <p><strong>First hexagram:</strong> {hexagrams[0].name?.en || 'No name'}</p>
          )}
        </div>

        {/* Simple Hexagrams List */}
        {hexagrams.length > 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">All Hexagrams</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {hexagrams.map((hexagram, index) => (
                <div key={hexagram.id || index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800 mb-1">
                      {hexagram.number}
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {hexagram.name?.en || 'No name'}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {hexagram.chineseName || hexagram.chinese_name || 'No Chinese name'}
                    </p>
                    <div className="text-xs text-gray-500 mt-2">
                      {hexagram.element} • {hexagram.season}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BookOpen className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No hexagrams found
            </h3>
            <p className="text-gray-500">
              There was an error loading the hexagrams data.
            </p>
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  )
}
