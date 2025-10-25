'use client'

import Link from 'next/link'
import { BookOpen, Shuffle, User, Globe, Info } from 'lucide-react'
import { useApp } from './providers'
import { ProfileButton } from '@/components/ProfileButton'
import { SimpleProfileButton } from '@/components/SimpleProfileButton'
import { ErrorBoundary } from '@/components/ErrorBoundary'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">☯</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">I Ching Divination</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/about"
                className="flex items-center space-x-2 text-gray-700 hover:text-amber-600 transition-colors"
              >
                <Info className="w-5 h-5" />
                <span>What is I Ching?</span>
              </Link>
              <Globe className="w-5 h-5 text-gray-700" />
              <ErrorBoundary>
                <SimpleProfileButton />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Ancient Wisdom for{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
              Modern Life
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore the profound teachings of the I Ching through interactive divination, 
            personalized readings, and multi-language support. Discover guidance for your journey.
          </p>
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Browse Hexagrams */}
          <Link
            href="/hexagrams"
            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-amber-200 hover:border-amber-300"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse Hexagrams</h2>
              <p className="text-gray-600 mb-6">
                Explore all 64 hexagrams with detailed interpretations, trigram meanings, 
                and traditional commentary in multiple languages.
              </p>
              <div className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                Start Exploring
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Random Draw */}
          <Link
            href="/draw"
            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-amber-200 hover:border-amber-300"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shuffle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Random Draw</h2>
              <p className="text-gray-600 mb-6">
                Let the universe guide you with a random hexagram selection. 
                Perfect for daily guidance or when seeking spontaneous insight.
              </p>
              <div className="inline-flex items-center text-emerald-600 font-medium group-hover:text-emerald-700 transition-colors">
                Draw a Hexagram
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Multi-Language Support</h3>
              <p className="text-gray-600">
                Access interpretations in English, Chinese, Hindi, Spanish, French, and Japanese.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Journals</h3>
              <p className="text-gray-600">
                Save your readings and create personal journals to reflect on your journey.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Voice Narration</h3>
              <p className="text-gray-600">
                Listen to interpretations with natural voice synthesis powered by ElevenLabs.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-gray-600">
          <p className="mb-4">
            Experience the wisdom of the I Ching, the ancient Book of Changes.
          </p>
          <p className="text-sm">
            Built with Next.js, Supabase, and ElevenLabs • Deployed on Vercel
          </p>
        </footer>
      </main>
    </div>
  )
}
