import { NextRequest, NextResponse } from 'next/server'
import { HexagramTranslation } from '@/types'
import { createClient } from '@supabase/supabase-js'

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function GET(request: NextRequest) {
  try {
    console.log('API Route: Checking Supabase configuration...')
    console.log('Supabase URL:', supabaseUrl ? 'Set' : 'Not set')
    console.log('Service Key:', supabaseServiceKey ? 'Set' : 'Not set')
    console.log('Actual URL:', supabaseUrl)
    console.log('Actual Service Key:', supabaseServiceKey ? 'Set (length: ' + supabaseServiceKey.length + ')' : 'Not set')
    
    // If Supabase is configured, fetch from database
    if (supabaseUrl && supabaseServiceKey) {
      console.log('API Route: Connecting to Supabase...')
      const supabase = createClient(supabaseUrl, supabaseServiceKey)
      
      const { data: hexagrams, error } = await supabase
        .from('hexagrams')
        .select('*')
        .order('number')
        .limit(100) // Ensure we get all hexagrams

      if (error) {
        console.error('Supabase error:', error)
        // Fallback to JSON data
        return await getFallbackData()
      }

      console.log('API Route: Successfully fetched', hexagrams?.length, 'hexagrams from Supabase')
      return NextResponse.json({
        data: hexagrams,
        count: hexagrams.length,
        success: true,
      })
    } else {
      console.log('API Route: Supabase not configured, using fallback data')
      // Fallback to JSON data when Supabase is not configured
      return await getFallbackData()
    }
  } catch (error) {
    console.error('Error fetching hexagrams:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hexagrams', success: false },
      { status: 500 }
    )
  }
}

async function getFallbackData() {
  // Fallback to JSON data
  const fs = await import('fs')
  const path = await import('path')
  
  const filePath = path.join(process.cwd(), 'src', 'data', 'hexagrams.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const hexagrams: HexagramTranslation[] = JSON.parse(fileContents)

  return NextResponse.json({
    data: hexagrams,
    count: hexagrams.length,
    success: true,
  })
}
