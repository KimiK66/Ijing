'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function MinimalHexagramsPage() {
  const [hexagrams, setHexagrams] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Import the data dynamically to avoid build issues
    import('@/data/all-64-enhanced-hexagrams.json')
      .then((module) => {
        console.log('Data imported:', module.default)
        setHexagrams(module.default)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error importing data:', error)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading hexagrams...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Minimal Hexagrams Test</h1>
        
        <div className="mb-4">
          <p><strong>Total hexagrams:</strong> {hexagrams.length}</p>
        </div>

        {hexagrams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {hexagrams.map((hexagram, index) => (
              <div key={hexagram.id || index} className="bg-white p-4 rounded-lg shadow">
                <div className="text-center">
                  <div className="text-lg font-bold">{hexagram.number}</div>
                  <div className="text-sm font-semibold">{hexagram.name?.en || 'No name'}</div>
                  <div className="text-xs text-gray-600">{hexagram.chineseName || 'No Chinese name'}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p>No hexagrams loaded</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
