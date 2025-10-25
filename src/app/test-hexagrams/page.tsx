'use client'

import { useState, useEffect } from 'react'
import hexagramsData from '@/data/complete-hexagrams.json'

export default function HexagramsTest() {
  const [hexagrams, setHexagrams] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    try {
      console.log('Loading hexagrams data...')
      console.log('Data type:', typeof hexagramsData)
      console.log('Data length:', Array.isArray(hexagramsData) ? hexagramsData.length : 'Not an array')
      console.log('First item:', hexagramsData[0])
      
      setHexagrams(hexagramsData as any[])
      setError('')
    } catch (err) {
      console.error('Error loading hexagrams:', err)
      setError(`Error: ${err}`)
    } finally {
      setIsLoading(false)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading hexagrams data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Hexagrams Data Test</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Data Summary</h2>
          <p><strong>Total hexagrams loaded:</strong> {hexagrams.length}</p>
          <p><strong>Data type:</strong> {typeof hexagrams}</p>
          <p><strong>Is array:</strong> {Array.isArray(hexagrams) ? 'Yes' : 'No'}</p>
        </div>
        
        {hexagrams.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">First Hexagram</h2>
            <div className="space-y-2">
              <p><strong>ID:</strong> {hexagrams[0].id}</p>
              <p><strong>Number:</strong> {hexagrams[0].number}</p>
              <p><strong>Name (EN):</strong> {hexagrams[0].name?.en}</p>
              <p><strong>Chinese Name:</strong> {hexagrams[0].chineseName}</p>
              <p><strong>Element:</strong> {hexagrams[0].element}</p>
              <p><strong>Season:</strong> {hexagrams[0].season}</p>
            </div>
          </div>
        )}
        
        <div className="mt-6">
          <a href="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
