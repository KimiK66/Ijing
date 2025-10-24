'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Shuffle, ArrowLeft, BookOpen } from 'lucide-react'
import { HexagramDisplay } from '@/components/HexagramDisplay'
import { AudioPlayer } from '@/components/AudioPlayer'
import { LanguageSelector } from '@/components/LanguageSelector'
import { useApp } from '@/app/providers'
import { HexagramTranslation } from '@/types'
import { getLocalizedText } from '@/lib/hexagrams'

export default function DrawPage() {
  const { language } = useApp()
  const [hexagrams, setHexagrams] = useState<HexagramTranslation[]>([])
  const [drawnHexagram, setDrawnHexagram] = useState<HexagramTranslation | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load hexagrams data
  useEffect(() => {
    const loadHexagrams = async () => {
      try {
        const response = await fetch('/api/hexagrams')
        const result = await response.json()
        if (result.success) {
          setHexagrams(result.data)
        } else {
          console.error('Failed to load hexagrams:', result.error)
        }
      } catch (error) {
        console.error('Error loading hexagrams:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadHexagrams()
  }, [])

  const drawHexagram = () => {
    if (hexagrams.length === 0) return

    setIsDrawing(true)
    
    // Simulate drawing animation
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * hexagrams.length)
      setDrawnHexagram(hexagrams[randomIndex])
      setIsDrawing(false)
    }, 2000)
  }

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
              <LanguageSelector />
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Random Hexagram Draw
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Let the universe guide you with a random hexagram selection. 
            Perfect for daily guidance or when seeking spontaneous insight.
          </p>
        </div>

        {/* Draw Button */}
        <div className="text-center mb-12">
          <button
            onClick={drawHexagram}
            disabled={isDrawing}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Shuffle className={`w-6 h-6 ${isDrawing ? 'animate-spin' : ''}`} />
            <span className="text-lg font-semibold">
              {isDrawing ? 'Drawing...' : 'Draw a Hexagram'}
            </span>
          </button>
        </div>

        {/* Drawing Animation */}
        {isDrawing && (
          <div className="text-center mb-12">
            <div className="relative w-32 h-32 mx-auto mb-6">
              {/* Animated hexagram cards */}
              <div className="absolute inset-0 flex items-center justify-center">
                {Array.from({ length: 6 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute w-16 h-24 bg-white rounded-lg shadow-lg border border-amber-200 animate-shuffle"
                    style={{
                      transform: `rotate(${i * 60}deg) translateY(-20px)`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
              {/* Central symbol */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">☯</span>
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-600">
              The universe is selecting your hexagram...
            </p>
          </div>
        )}

        {/* Drawn Hexagram */}
        {drawnHexagram && !isDrawing && (
          <div className="fade-in">
            <HexagramDisplay
              hexagram={drawnHexagram}
              language={language}
              className="mb-8"
            />

            {/* Audio Player */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">🔊</span>
                <h2 className="text-xl font-semibold text-gray-900">Listen to Reading</h2>
              </div>
              <AudioPlayer
                text={`${getLocalizedText(drawnHexagram.judgement, language)} ${getLocalizedText(drawnHexagram.image, language)} ${getLocalizedText(drawnHexagram.interpretation, language)}`}
                language={language}
                hexagram={drawnHexagram}
                className="w-full"
              />
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">What would you like to do next?</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <button
                  onClick={drawHexagram}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Shuffle className="w-5 h-5" />
                  <span>Draw Another</span>
                </button>
                <Link
                  href={`/hexagrams/${drawnHexagram.number}`}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>View Details</span>
                </Link>
                <Link
                  href="/hexagrams"
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Browse All</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!drawnHexagram && !isDrawing && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shuffle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Seek Guidance?
            </h2>
            <p className="text-gray-600 mb-6">
              Click the button above to draw a random hexagram. The I Ching will provide 
              wisdom and guidance for your current situation or question.
            </p>
            <div className="text-sm text-gray-500">
              <p className="mb-2">💡 <strong>Tip:</strong> You can ask a specific question in your mind before drawing,</p>
              <p>or simply seek general guidance for your journey.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
