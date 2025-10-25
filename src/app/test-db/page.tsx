'use client'

import { useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase'

export default function DatabaseTest() {
  const [result, setResult] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const testDatabase = async () => {
    setIsLoading(true)
    setResult('Testing database connection...')
    
    try {
      const supabase = createSupabaseClient()
      
      // Test 1: Check if we can connect
      setResult('Testing Supabase connection...')
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) {
        setResult(`Session error: ${sessionError.message}`)
        return
      }
      
      setResult(`Session check: ${session ? 'Found' : 'Not found'}`)
      
      // Test 2: Check if tables exist
      setResult('Testing if tables exist...')
      const { data: readings, error: readingsError } = await supabase
        .from('user_readings')
        .select('count')
        .limit(1)
      
      if (readingsError) {
        setResult(`Readings table error: ${readingsError.message}`)
        return
      }
      
      setResult('Readings table exists!')
      
      // Test 3: Check journals table
      const { data: journals, error: journalsError } = await supabase
        .from('user_journals')
        .select('count')
        .limit(1)
      
      if (journalsError) {
        setResult(`Journals table error: ${journalsError.message}`)
        return
      }
      
      setResult('All database tests passed! Tables exist and are accessible.')
      
    } catch (error) {
      setResult(`Error: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Database Test</h1>
        <button
          onClick={testDatabase}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Testing...' : 'Test Database'}
        </button>
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <pre className="text-sm">{result}</pre>
        </div>
      </div>
    </div>
  )
}
