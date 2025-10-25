'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Volume2, BookOpen, Save, Info } from 'lucide-react'
import { HexagramDisplay } from '@/components/HexagramDisplay'
import { AudioPlayer } from '@/components/AudioPlayer'
import { LanguageSelector } from '@/components/LanguageSelector'
import { useApp } from '@/app/providers'
import { HexagramTranslation } from '@/types'
import { getLocalizedText } from '@/lib/hexagrams'

interface HexagramPageProps {
  params: {
    id: string
  }
}

export default function HexagramPage({ params }: HexagramPageProps) {
  const { language } = useApp()
  const [hexagram, setHexagram] = useState<HexagramTranslation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const hexagramId = params.id

  useEffect(() => {
    const loadHexagram = async () => {
      try {
        // Fetch individual hexagram from API endpoint
        const response = await fetch(`/api/hexagrams/${hexagramId}`)
        const result = await response.json()
        
        if (result.success) {
          setHexagram(result.data)
        } else {
          console.error('Failed to load hexagram:', result.error)
          setHexagram(null)
        }
      } catch (error) {
        console.error('Error loading hexagram:', error)
        setHexagram(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadHexagram()
  }, [hexagramId])

  const handleSaveReading = async () => {
    if (!hexagram) return

    setIsSaving(true)
    try {
      // In a real app, this would save to your database
      const reading = {
        hexagram_id: hexagram.id,
        question: '',
        context: '',
        timestamp: new Date().toISOString(),
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Show success message
      alert('Reading saved successfully!')
    } catch (error) {
      console.error('Error saving reading:', error)
      alert('Failed to save reading. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hexagram...</p>
        </div>
      </div>
    )
  }

  if (!hexagram) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Hexagram Not Found</h1>
          <p className="text-gray-600 mb-6">The hexagram you're looking for doesn't exist.</p>
          <Link
            href="/hexagrams"
            className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Hexagrams
          </Link>
        </div>
      </div>
    )
  }

  const fullText = `${getLocalizedText(hexagram.judgement, language)} ${getLocalizedText(hexagram.image, language)} ${getLocalizedText(hexagram.interpretation, language)}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/hexagrams"
                className="flex items-center space-x-2 text-gray-700 hover:text-amber-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Hexagrams</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/about"
                className="flex items-center space-x-2 text-gray-700 hover:text-amber-600 transition-colors"
              >
                <Info className="w-5 h-5" />
                <span>
                  {language === 'zh' ? '什么是易经？' :
                   language === 'hi' ? 'आई चिंग क्या है?' :
                   language === 'es' ? '¿Qué es el I Ching?' :
                   language === 'fr' ? 'Qu\'est-ce que le I Ching ?' :
                   language === 'ja' ? '易経とは？' :
                   'What is I Ching?'}
                </span>
              </Link>
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
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSaveReading}
              disabled={isSaving}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Reading'}</span>
            </button>
          </div>
        </div>

        {/* Hexagram Display */}
        <HexagramDisplay
          hexagram={hexagram}
          language={language}
          className="mb-8"
        />

        {/* Audio Player */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Volume2 className="w-6 h-6 text-amber-600" />
            <h2 className="text-xl font-semibold text-gray-900">Listen to Reading</h2>
          </div>
          <AudioPlayer
            text={fullText}
            language={language}
            hexagram={hexagram}
            className="w-full"
          />
        </div>

        {/* Navigation to Other Hexagrams */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Explore More Hexagrams</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href={`/hexagrams/${hexagram.number === 1 ? 64 : hexagram.number - 1}`}
              className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="text-sm text-gray-600">Previous</div>
              <div className="font-semibold text-gray-900">
                {hexagram.number === 1 ? 64 : hexagram.number - 1}
              </div>
            </Link>
            <Link
              href="/hexagrams"
              className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="text-sm text-gray-600">Browse All</div>
              <div className="font-semibold text-gray-900">64</div>
            </Link>
            <Link
              href="/draw"
              className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="text-sm text-gray-600">Random Draw</div>
              <div className="font-semibold text-gray-900">?</div>
            </Link>
            <Link
              href={`/hexagrams/${hexagram.number === 64 ? 1 : hexagram.number + 1}`}
              className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="text-sm text-gray-600">Next</div>
              <div className="font-semibold text-gray-900">
                {hexagram.number === 64 ? 1 : hexagram.number + 1}
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
