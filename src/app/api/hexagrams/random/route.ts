import { NextRequest, NextResponse } from 'next/server'
import { HexagramTranslation } from '@/types'

export async function GET(request: NextRequest) {
  try {
    // In a real app, this would fetch from Supabase
    const response = await fetch(new URL('/data/hexagrams.json', request.url))
    const hexagrams: HexagramTranslation[] = await response.json()

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
  } catch (error) {
    console.error('Error fetching random hexagram:', error)
    return NextResponse.json(
      { error: 'Failed to fetch random hexagram', success: false },
      { status: 500 }
    )
  }
}
