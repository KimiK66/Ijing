'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Filter, BookOpen, Info } from 'lucide-react'
import { HexagramCard } from '@/components/HexagramCard'
import { LanguageSelector } from '@/components/LanguageSelector'
import { useApp } from '@/app/providers'
import { HexagramTranslation, SupportedLanguage } from '@/types'
import { searchHexagrams, filterHexagramsByElement, filterHexagramsBySeason } from '@/lib/hexagrams'
import hexagramsData from '@/data/all-64-enhanced-hexagrams.json'

export default function HexagramsPage() {
  const { language } = useApp()
  const [hexagrams, setHexagrams] = useState<HexagramTranslation[]>([])
  const [filteredHexagrams, setFilteredHexagrams] = useState<HexagramTranslation[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedElement, setSelectedElement] = useState('')
  const [selectedSeason, setSelectedSeason] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Load hexagrams data
  useEffect(() => {
    const loadHexagrams = async () => {
      try {
        // Use the imported hexagrams data directly
        setHexagrams(hexagramsData as HexagramTranslation[])
        setFilteredHexagrams(hexagramsData as HexagramTranslation[])
      } catch (error) {
        console.error('Error loading hexagrams:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadHexagrams()
  }, [])

  // Filter hexagrams based on search and filters
  useEffect(() => {
    let filtered = hexagrams

    // Apply search filter
    if (searchQuery) {
      filtered = searchHexagrams(filtered, searchQuery, language)
    }

    // Apply element filter
    if (selectedElement) {
      filtered = filterHexagramsByElement(filtered, selectedElement)
    }

    // Apply season filter
    if (selectedSeason) {
      filtered = filterHexagramsBySeason(filtered, selectedSeason)
    }

    setFilteredHexagrams(filtered)
  }, [hexagrams, searchQuery, selectedElement, selectedSeason, language])

  const elements = ['Metal', 'Wood', 'Water', 'Fire', 'Earth']
  const seasons = ['Spring', 'Summer', 'Autumn', 'Winter']

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

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search hexagrams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Element Filter */}
            <select
              value={selectedElement}
              onChange={(e) => setSelectedElement(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="">All Elements</option>
              {elements.map((element) => (
                <option key={element} value={element}>
                  {element}
                </option>
              ))}
            </select>

            {/* Season Filter */}
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="">All Seasons</option>
              {seasons.map((season) => (
                <option key={season} value={season}>
                  {season}
                </option>
              ))}
            </select>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedElement('')
                setSelectedSeason('')
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredHexagrams.length} of {hexagrams.length} hexagrams
          </p>
        </div>

        {/* Hexagrams Grid */}
        {filteredHexagrams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredHexagrams.map((hexagram) => (
              <Link
                key={hexagram.id}
                href={`/hexagrams/${hexagram.number}`}
                className="block"
              >
                <HexagramCard
                  hexagram={hexagram}
                  language={language}
                  showDetails={true}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No hexagrams found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or clearing the filters.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
