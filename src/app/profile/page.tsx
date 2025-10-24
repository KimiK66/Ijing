'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Heart, Calendar, User } from 'lucide-react'
import { LanguageSelector } from '@/components/LanguageSelector'
import { useApp } from '@/app/providers'
import { UserReading, UserJournal } from '@/types'

export default function ProfilePage() {
  const { language } = useApp()
  const [readings, setReadings] = useState<UserReading[]>([])
  const [journals, setJournals] = useState<UserJournal[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Mock data for demonstration
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Simulate loading user data
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock readings data
        const mockReadings: UserReading[] = [
          {
            id: '1',
            user_id: 'user-1',
            hexagram_id: 'hexagram-01',
            question: 'What should I focus on this week?',
            context: 'Starting a new project',
            timestamp: new Date().toISOString(),
          },
          {
            id: '2',
            user_id: 'user-1',
            hexagram_id: 'hexagram-02',
            question: 'How can I improve my relationships?',
            context: 'Family gathering',
            timestamp: new Date(Date.now() - 86400000).toISOString(),
          },
        ]

        // Mock journals data
        const mockJournals: UserJournal[] = [
          {
            id: '1',
            user_id: 'user-1',
            reading_id: '1',
            title: 'New Project Insights',
            content: 'The Creative hexagram provided excellent guidance for starting my new project. I feel confident about taking the initiative and leading with strength.',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]

        setReadings(mockReadings)
        setJournals(mockJournals)
      } catch (error) {
        console.error('Error loading user data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
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
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Profile</h1>
            <p className="text-gray-600">Manage your readings and personal journals</p>
          </div>
          <Link
            href="/"
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{readings.length}</div>
            <div className="text-gray-600">Total Readings</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{journals.length}</div>
            <div className="text-gray-600">Journal Entries</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">7</div>
            <div className="text-gray-600">Days Active</div>
          </div>
        </div>

        {/* Recent Readings */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Readings</h2>
            <Link
              href="/hexagrams"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          
          {readings.length > 0 ? (
            <div className="space-y-4">
              {readings.map((reading) => (
                <div key={reading.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{reading.hexagram_id.split('-')[1]}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Hexagram {reading.hexagram_id.split('-')[1]}</h3>
                        <p className="text-sm text-gray-600">{reading.question || 'General guidance'}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(reading.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  {reading.context && (
                    <p className="text-sm text-gray-600 italic">{reading.context}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No readings yet</h3>
              <p className="text-gray-600 mb-4">Start your I Ching journey by drawing a hexagram.</p>
              <Link
                href="/draw"
                className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                Draw a Hexagram
              </Link>
            </div>
          )}
        </div>

        {/* Journal Entries */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Personal Journal</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              New Entry
            </button>
          </div>
          
          {journals.length > 0 ? (
            <div className="space-y-4">
              {journals.map((journal) => (
                <div key={journal.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{journal.title}</h3>
                    <div className="text-sm text-gray-500">
                      {new Date(journal.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{journal.content}</p>
                  {journal.reading_id && (
                    <div className="mt-2 text-xs text-gray-500">
                      Related to reading #{journal.reading_id}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No journal entries yet</h3>
              <p className="text-gray-600 mb-4">Start reflecting on your I Ching readings with a personal journal.</p>
              <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Create First Entry
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
