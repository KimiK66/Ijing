'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, Info } from 'lucide-react'
import { LanguageSelector } from '@/components/LanguageSelector'
import { useApp } from '@/app/providers'
import { getLocalizedText } from '@/lib/hexagrams'
import { HexagramTranslation } from '@/types'
import hexagramsData from '@/data/complete-hexagrams.json'

export default function HexagramsPage() {
  const { language } = useApp()
  const [hexagrams, setHexagrams] = useState<HexagramTranslation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load hexagrams data
  useEffect(() => {
    const loadHexagrams = async () => {
      try {
        console.log('Loading hexagrams data...')
        console.log('Data source: complete-hexagrams.json')
        console.log('Data:', hexagramsData)
        // Use the imported hexagrams data directly
        setHexagrams(hexagramsData as HexagramTranslation[])
        console.log('Hexagrams loaded:', hexagramsData.length)
      } catch (error) {
        console.error('Error loading hexagrams:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadHexagrams()
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse All 64 Hexagrams
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the profound wisdom of the I Ching through all 64 hexagrams. 
            Each hexagram offers unique insights and guidance for your journey.
          </p>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {hexagrams.length} hexagrams
          </p>
        </div>

        {/* Hexagrams Grid */}
        {hexagrams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {hexagrams.map((hexagram) => {
              const name = getLocalizedText(hexagram.name, language)
              const keywords = getLocalizedText(hexagram.keywords, language)
              const keywordsList = keywords.split(',').map(k => k.trim()).slice(0, 3)
              
              return (
                <Link
                  key={hexagram.id}
                  href={`/hexagrams/${hexagram.number}`}
                  className="block bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  {/* Hexagram Number and Name */}
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-gray-800 mb-1">
                      {hexagram.number}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {hexagram.chinese_name || hexagram.chineseName}
                    </p>
                  </div>

                  {/* Hexagram Symbol */}
                  <div className="flex justify-center mb-4">
                    <div className="space-y-1">
                      {Array.from({ length: 6 }, (_, i) => (
                        <div key={i} className="flex justify-center">
                          {i % 2 === 0 ? (
                            <div className="w-12 h-1 bg-gray-800"></div>
                          ) : (
                            <div className="flex space-x-1">
                              <div className="w-4 h-1 bg-gray-800"></div>
                              <div className="w-4 h-1 bg-gray-800"></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trigrams */}
                  <div className="text-center mb-4">
                    <div className="text-sm text-gray-600">
                      {hexagram.lower_trigram || hexagram.lowerTrigram} {hexagram.upper_trigram || hexagram.upperTrigram}
                    </div>
                  </div>

                  {/* Keywords */}
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-sm text-gray-500 mb-2">Keywords</div>
                      <div className="flex flex-wrap justify-center gap-1">
                        {keywordsList.map((keyword, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Element and Season */}
                  <div className="flex justify-between text-xs text-gray-500 mt-3 pt-3 border-t border-amber-200">
                    <span>{hexagram.element}</span>
                    <span>{hexagram.season}</span>
                  </div>
                </Link>
              )
            })}
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
      </main>
    </div>
  )
}
