import { NextRequest, NextResponse } from 'next/server'
import { HexagramTranslation } from '@/types'
import { createClient } from '@supabase/supabase-js'

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function GET(request: NextRequest) {
  try {
    // If Supabase is configured, fetch from database
    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey)
      
      const { data: hexagrams, error } = await supabase
        .from('hexagrams')
        .select('*')
        .limit(100) // Ensure we get all hexagrams

      if (error) {
        console.error('Supabase error:', error)
        // Fallback to JSON data
        return await getFallbackData()
      }

      if (hexagrams.length === 0) {
        return NextResponse.json(
          { error: 'No hexagrams available', success: false },
          { status: 404 }
        )
      }

      // Get random hexagram
      const randomIndex = Math.floor(Math.random() * hexagrams.length)
      const randomHexagram = hexagrams[randomIndex]

      return NextResponse.json({
        data: randomHexagram,
        success: true,
      })
    } else {
      // Fallback to JSON data when Supabase is not configured
      return await getFallbackData()
    }
  } catch (error) {
    console.error('Error fetching random hexagram:', error)
    return NextResponse.json(
      { error: 'Failed to fetch random hexagram', success: false },
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

  if (hexagrams.length === 0) {
    return NextResponse.json(
      { error: 'No hexagrams available', success: false },
      { status: 404 }
    )
  }

  // Get random hexagram
  const randomIndex = Math.floor(Math.random() * hexagrams.length)
  const randomHexagram = hexagrams[randomIndex]

  return NextResponse.json({
    data: randomHexagram,
    success: true,
  })
}
