import { NextRequest, NextResponse } from 'next/server'
import { HexagramTranslation } from '@/types'
import { createClient } from '@supabase/supabase-js'

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

interface HexagramParams {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: HexagramParams) {
  try {
    const hexagramId = params.id

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
        return await getFallbackData(hexagramId)
      }

      const hexagram = hexagrams.find(h => h.id === hexagramId || h.number.toString() === hexagramId)

      if (!hexagram) {
        return NextResponse.json(
          { error: 'Hexagram not found', success: false },
          { status: 404 }
        )
      }

      return NextResponse.json({
        data: hexagram,
        success: true,
      })
    } else {
      // Fallback to JSON data when Supabase is not configured
      return await getFallbackData(hexagramId)
    }
  } catch (error) {
    console.error('Error fetching hexagram:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hexagram', success: false },
      { status: 500 }
    )
  }
}

async function getFallbackData(hexagramId: string) {
  // Use the complete-hexagrams.json file instead of the old hexagrams.json
  const fs = await import('fs')
  const path = await import('path')

  const filePath = path.join(process.cwd(), 'src', 'data', 'complete-hexagrams.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const hexagrams: HexagramTranslation[] = JSON.parse(fileContents)
  
  const hexagram = hexagrams.find(h => h.id === hexagramId || h.number.toString() === hexagramId)

  if (!hexagram) {
    return NextResponse.json(
      { error: 'Hexagram not found', success: false },
      { status: 404 }
    )
  }

  return NextResponse.json({
    data: hexagram,
    success: true,
  })
}
