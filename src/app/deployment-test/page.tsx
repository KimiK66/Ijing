'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function DeploymentTest() {
  const [hexagrams, setHexagrams] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    // Test dynamic import
    import('@/data/complete-hexagrams.json')
      .then((module) => {
        console.log('=== DEPLOYMENT TEST ===')
        console.log('Data loaded:', module.default)
        console.log('Count:', module.default.length)
        setHexagrams(module.default)
        setError('')
      })
      .catch((err) => {
        console.error('Import error:', err)
        setError(`Import error: ${err.message}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Testing deployment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Deployment Test</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          <p><strong>Hexagrams loaded:</strong> {hexagrams.length}</p>
          <p><strong>Expected:</strong> 64</p>
          <p><strong>Status:</strong> {hexagrams.length === 64 ? '✅ PASS' : '❌ FAIL'}</p>
        </div>

        {hexagrams.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Sample Hexagrams</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {hexagrams.slice(0, 8).map((hexagram, index) => (
                <div key={hexagram.id || index} className="border border-gray-200 rounded p-3">
                  <div className="text-center">
                    <div className="font-bold">{hexagram.number}</div>
                    <div className="text-sm">{hexagram.name?.en || 'No name'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center space-x-4">
          <Link href="/hexagrams" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Go to Browse Hexagrams
          </Link>
          <Link href="/" className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
