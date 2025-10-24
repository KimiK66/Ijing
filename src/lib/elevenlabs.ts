import { SupportedLanguage } from '@/types'

// Voice configuration for different languages
export const VOICE_CONFIGS = {
  en: {
    voiceId: 'pNInz6obpgDQGcFmaJgB', // Adam (English)
    modelId: 'eleven_monolingual_v1',
    stability: 0.5,
    similarityBoost: 0.5,
  },
  zh: {
    voiceId: 'EXAVITQu4vr4xnSDxMaL', // Bella (Chinese)
    modelId: 'eleven_multilingual_v1',
    stability: 0.5,
    similarityBoost: 0.5,
  },
  hi: {
    voiceId: 'VR6AewLTigWG4xSOukaG', // Josh (Hindi)
    modelId: 'eleven_multilingual_v1',
    stability: 0.5,
    similarityBoost: 0.5,
  },
  es: {
    voiceId: 'TxGEqnHWrfWFTfGW9XjX', // Josh (Spanish)
    modelId: 'eleven_multilingual_v1',
    stability: 0.5,
    similarityBoost: 0.5,
  },
  fr: {
    voiceId: 'VR6AewLTigWG4xSOukaG', // Josh (French)
    modelId: 'eleven_multilingual_v1',
    stability: 0.5,
    similarityBoost: 0.5,
  },
  ja: {
    voiceId: 'AZnzlk1XvdvUeBnXmlld', // Domi (Japanese)
    modelId: 'eleven_multilingual_v1',
    stability: 0.5,
    similarityBoost: 0.5,
  },
} as const

export interface AudioGenerationOptions {
  text: string
  language: SupportedLanguage
  voiceId?: string
  modelId?: string
  stability?: number
  similarityBoost?: number
}

export interface AudioResponse {
  audio: ArrayBuffer
  contentType: string
}

// Generate audio using ElevenLabs API
export async function generateAudio({
  text,
  language,
  voiceId,
  modelId,
  stability = 0.5,
  similarityBoost = 0.5,
}: AudioGenerationOptions): Promise<AudioResponse> {
  const config = VOICE_CONFIGS[language]
  const finalVoiceId = voiceId || config.voiceId
  const finalModelId = modelId || config.modelId

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${finalVoiceId}`,
    {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVENLABS_API_KEY!,
      },
      body: JSON.stringify({
        text,
        model_id: finalModelId,
        voice_settings: {
          stability,
          similarity_boost: similarityBoost,
        },
      }),
    }
  )

  if (!response.ok) {
    throw new Error(`ElevenLabs API error: ${response.status} ${response.statusText}`)
  }

  const audioBuffer = await response.arrayBuffer()
  const contentType = response.headers.get('content-type') || 'audio/mpeg'

  return {
    audio: audioBuffer,
    contentType,
  }
}

// Create audio URL from buffer
export function createAudioURL(audioBuffer: ArrayBuffer, contentType: string): string {
  const blob = new Blob([audioBuffer], { type: contentType })
  return URL.createObjectURL(blob)
}

// Preprocess text for better speech synthesis
export function preprocessTextForSpeech(text: string, language: SupportedLanguage): string {
  let processedText = text

  // Remove markdown formatting
  processedText = processedText.replace(/\*\*(.*?)\*\*/g, '$1') // Bold
  processedText = processedText.replace(/\*(.*?)\*/g, '$1') // Italic
  processedText = processedText.replace(/`(.*?)`/g, '$1') // Code
  processedText = processedText.replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links

  // Add pauses for better speech flow
  processedText = processedText.replace(/\./g, '. ')
  processedText = processedText.replace(/,/g, ', ')
  processedText = processedText.replace(/;/g, '; ')

  // Language-specific preprocessing
  switch (language) {
    case 'zh':
      // Add pauses between Chinese characters for better pronunciation
      processedText = processedText.replace(/([^\x00-\x7F])([^\x00-\x7F])/g, '$1 $2')
      break
    case 'ja':
      // Add pauses between Japanese characters
      processedText = processedText.replace(/([^\x00-\x7F])([^\x00-\x7F])/g, '$1 $2')
      break
    case 'hi':
      // Add pauses for Hindi text
      processedText = processedText.replace(/([^\x00-\x7F])([^\x00-\x7F])/g, '$1 $2')
      break
  }

  return processedText.trim()
}

// Get available voices for a language
export function getVoicesForLanguage(language: SupportedLanguage) {
  return VOICE_CONFIGS[language] ? [VOICE_CONFIGS[language]] : []
}

// Validate voice configuration
export function validateVoiceConfig(language: SupportedLanguage): boolean {
  return language in VOICE_CONFIGS
}

// Cache management for audio files
export class AudioCache {
  private cache = new Map<string, string>()

  set(key: string, audioURL: string): void {
    this.cache.set(key, audioURL)
  }

  get(key: string): string | undefined {
    return this.cache.get(key)
  }

  has(key: string): boolean {
    return this.cache.has(key)
  }

  delete(key: string): void {
    const url = this.cache.get(key)
    if (url) {
      URL.revokeObjectURL(url)
      this.cache.delete(key)
    }
  }

  clear(): void {
    this.cache.forEach(url => URL.revokeObjectURL(url))
    this.cache.clear()
  }

  // Generate cache key from text and language
  generateKey(text: string, language: SupportedLanguage): string {
    return `${language}_${text.slice(0, 50)}_${text.length}`
  }
}

// Global audio cache instance
export const audioCache = new AudioCache()
