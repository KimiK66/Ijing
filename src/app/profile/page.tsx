'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Heart, Calendar, User, Plus, Edit, Trash2, Save, X } from 'lucide-react'
import { useApp } from '@/app/providers'
import { createSupabaseClient } from '@/lib/supabase'

interface UserReading {
  id: string
  user_id: string
  hexagram_id: string
  question?: string
  context?: string
  timestamp: string
  created_at: string
}

interface UserJournal {
  id: string
  user_id: string
  reading_id?: string
  title: string
  content: string
  created_at: string
  updated_at: string
}

interface JournalFormData {
  title: string
  content: string
  reading_id?: string
}

export default function ProfilePage() {
  const { isAuthenticated, user } = useApp()
  const [readings, setReadings] = useState<UserReading[]>([])
  const [journals, setJournals] = useState<UserJournal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreatingJournal, setIsCreatingJournal] = useState(false)
  const [editingJournal, setEditingJournal] = useState<string | null>(null)
  const [journalForm, setJournalForm] = useState<JournalFormData>({
    title: '',
    content: '',
    reading_id: undefined
  })

  const supabase = createSupabaseClient()

  // Load user data from Supabase
  useEffect(() => {
    const loadUserData = async () => {
      try {
        console.log('=== PROFILE PAGE LOAD ===')
        console.log('isAuthenticated:', isAuthenticated)
        console.log('user:', user?.email || 'none')
        
        // Check for session first
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        console.log('Session check:', session ? 'found' : 'not found')
        console.log('Session error:', sessionError)
        
        if (session?.user) {
          console.log('Found session user:', session.user.email)
          const currentUser = session.user
          
          // Load readings
          console.log('Loading readings for user:', currentUser.id)
          const { data: readingsData, error: readingsError } = await supabase
            .from('user_readings')
            .select('*')
            .eq('user_id', currentUser.id)
            .order('timestamp', { ascending: false })

          console.log('Readings query result:', readingsData)
          console.log('Readings error:', readingsError)

          if (readingsError) {
            console.error('Error loading readings:', readingsError)
          } else {
            setReadings(readingsData || [])
            console.log('Readings loaded:', readingsData?.length || 0)
          }

          // Load journals
          console.log('Loading journals for user:', currentUser.id)
          const { data: journalsData, error: journalsError } = await supabase
            .from('user_journals')
            .select('*')
            .eq('user_id', currentUser.id)
            .order('created_at', { ascending: false })

          console.log('Journals query result:', journalsData)
          console.log('Journals error:', journalsError)

          if (journalsError) {
            console.error('Error loading journals:', journalsError)
          } else {
            setJournals(journalsData || [])
            console.log('Journals loaded:', journalsData?.length || 0)
          }
        } else {
          console.log('No session found, user not authenticated')
        }
      } catch (error) {
        console.error('Error loading user data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadUserData()
  }, [])

  const handleCreateJournal = async () => {
    if (!journalForm.title.trim() || !journalForm.content.trim()) return

    try {
      // Get current session user
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        alert('Please sign in to create journal entries')
        return
      }

      const { data, error } = await supabase
        .from('user_journals')
        .insert({
          user_id: session.user.id,
          title: journalForm.title,
          content: journalForm.content,
          reading_id: journalForm.reading_id || null
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating journal:', error)
        alert('Failed to create journal entry. Please try again.')
      } else {
        setJournals(prev => [data, ...prev])
        setJournalForm({ title: '', content: '', reading_id: undefined })
        setIsCreatingJournal(false)
      }
    } catch (error) {
      console.error('Error creating journal:', error)
      alert('Failed to create journal entry. Please try again.')
    }
  }

  const handleDeleteJournal = async (journalId: string) => {
    if (!confirm('Are you sure you want to delete this journal entry?')) return

    try {
      const { error } = await supabase
        .from('user_journals')
        .delete()
        .eq('id', journalId)

      if (error) {
        console.error('Error deleting journal:', error)
        alert('Failed to delete journal entry. Please try again.')
      } else {
        setJournals(prev => prev.filter(j => j.id !== journalId))
      }
    } catch (error) {
      console.error('Error deleting journal:', error)
      alert('Failed to delete journal entry. Please try again.')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
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
                href="/"
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Profile</h1>
            <p className="text-gray-600">
              {isAuthenticated ? `Welcome back, ${user?.email}!` : 'Please sign in to access your profile'}
            </p>
          </div>
        </div>

        {/* Authentication Status */}
        {!isAuthenticated ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-3">
              <User className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-1">Sign in required</h3>
                <p className="text-blue-700 mb-4">
                  Please sign in to view your readings and journals.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Go Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
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
                <h2 className="text-xl font-semibold text-gray-900">Your Readings</h2>
                <Link
                  href="/draw"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Draw New Reading
                </Link>
              </div>
              
              {readings.length > 0 ? (
                <div className="space-y-4">
                  {readings.map((reading) => (
                    <div key={reading.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{reading.hexagram_id.split('-')[1] || '?'}</span>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">Hexagram {reading.hexagram_id.split('-')[1] || 'Unknown'}</h3>
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
                <button 
                  onClick={() => setIsCreatingJournal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Entry</span>
                </button>
              </div>

              {/* Journal Creation Form */}
              {isCreatingJournal && (
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Journal Entry</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={journalForm.title}
                        onChange={(e) => setJournalForm(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter journal entry title..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content
                      </label>
                      <textarea
                        value={journalForm.content}
                        onChange={(e) => setJournalForm(prev => ({ ...prev, content: e.target.value }))}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Write your thoughts, insights, and reflections..."
                      />
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={handleCreateJournal}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Entry</span>
                      </button>
                      <button
                        onClick={() => {
                          setJournalForm({ title: '', content: '', reading_id: undefined })
                          setIsCreatingJournal(false)
                        }}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {journals.length > 0 ? (
                <div className="space-y-4">
                  {journals.map((journal) => (
                    <div key={journal.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{journal.title}</h3>
                        <div className="flex items-center space-x-2">
                          <div className="text-sm text-gray-500">
                            {new Date(journal.created_at).toLocaleDateString()}
                          </div>
                          <button
                            onClick={() => handleDeleteJournal(journal.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete entry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm whitespace-pre-wrap">{journal.content}</p>
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
                  <p className="text-gray-600 mb-4">
                    Start reflecting on your I Ching readings with a personal journal.
                  </p>
                  <button 
                    onClick={() => setIsCreatingJournal(true)}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Entry
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}