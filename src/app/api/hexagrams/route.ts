import { NextRequest, NextResponse } from 'next/server'
import { HexagramTranslation } from '@/types'

export async function GET(request: NextRequest) {
  try {
    // In a real app, this would fetch from Supabase
    // For now, we'll return sample data
    const response = await fetch(new URL('/data/hexagrams.json', request.url))
    const hexagrams: HexagramTranslation[] = await response.json()

    return NextResponse.json({
      data: hexagrams,
      count: hexagrams.length,
      success: true,
    })
  } catch (error) {
    console.error('Error fetching hexagrams:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hexagrams', success: false },
      { status: 500 }
    )
  }
}
