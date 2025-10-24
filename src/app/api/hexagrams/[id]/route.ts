import { NextRequest, NextResponse } from 'next/server'
import { HexagramTranslation } from '@/types'

interface HexagramParams {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: HexagramParams) {
  try {
    const hexagramId = params.id

    // In a real app, this would fetch from Supabase
    const response = await fetch(new URL('/data/hexagrams.json', request.url))
    const hexagrams: HexagramTranslation[] = await response.json()
    
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
  } catch (error) {
    console.error('Error fetching hexagram:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hexagram', success: false },
      { status: 500 }
    )
  }
}
