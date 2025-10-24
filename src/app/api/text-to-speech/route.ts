import { NextRequest, NextResponse } from 'next/server'
import { generateAudio, preprocessTextForSpeech } from '@/lib/elevenlabs'
import { SupportedLanguage } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const { text, language, enhanced }: { text: string; language: SupportedLanguage; enhanced?: boolean } = await request.json()

    if (!text || !language) {
      return NextResponse.json(
        { error: 'Text and language are required' },
        { status: 400 }
      )
    }

    if (!process.env.ELEVENLABS_API_KEY) {
      return NextResponse.json(
        { error: 'ElevenLabs API key not configured' },
        { status: 500 }
      )
    }

    // Enhanced preprocessing for more human-like speech
    const processedText = preprocessTextForSpeech(text, language)

    // Generate audio with enhanced settings
    const audioResponse = await generateAudio({
      text: processedText,
      language,
    })

    // Return the audio as a response
    return new NextResponse(audioResponse.audio, {
      status: 200,
      headers: {
        'Content-Type': audioResponse.contentType,
        'Content-Length': audioResponse.audio.byteLength.toString(),
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        'X-Enhanced-Audio': enhanced ? 'true' : 'false', // Flag for enhanced processing
      },
    })
  } catch (error) {
    console.error('Enhanced text-to-speech error:', error)
    return NextResponse.json(
      { error: 'Failed to generate enhanced audio' },
      { status: 500 }
    )
  }
}
