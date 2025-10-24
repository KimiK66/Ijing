import { SupportedLanguage } from '@/types'

// Voice configuration for different languages - IMPROVED FOR I CHING
export const VOICE_CONFIGS = {
  en: {
    voiceId: 'pNInz6obpgDQGcFmaJgB', // Adam (English) - Clear, authoritative
    modelId: 'eleven_multilingual_v2', // Better model for complex text
    stability: 0.75, // Higher stability for consistent pronunciation
    similarityBoost: 0.8, // Higher similarity for better voice quality
  },
  zh: {
    voiceId: 'EXAVITQu4vr4xnSDxMaL', // Bella (Chinese) - Native Chinese speaker
    modelId: 'eleven_multilingual_v2',
    stability: 0.8, // Very high stability for Chinese characters
    similarityBoost: 0.9, // Maximum similarity for authentic pronunciation
  },
  hi: {
    voiceId: 'VR6AewLTigWG4xSOukaG', // Josh (Hindi) - Good for Sanskrit-derived terms
    modelId: 'eleven_multilingual_v2',
    stability: 0.7,
    similarityBoost: 0.8,
  },
  es: {
    voiceId: 'TxGEqnHWrfWFTfGW9XjX', // Josh (Spanish) - Clear Spanish pronunciation
    modelId: 'eleven_multilingual_v2',
    stability: 0.7,
    similarityBoost: 0.8,
  },
  fr: {
    voiceId: 'VR6AewLTigWG4xSOukaG', // Josh (French) - Good for philosophical terms
    modelId: 'eleven_multilingual_v2',
    stability: 0.7,
    similarityBoost: 0.8,
  },
  ja: {
    voiceId: 'AZnzlk1XvdvUeBnXmlld', // Domi (Japanese) - Native Japanese speaker
    modelId: 'eleven_multilingual_v2',
    stability: 0.8, // High stability for Japanese characters
    similarityBoost: 0.9, // Maximum similarity for authentic pronunciation
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

// I Ching-specific text preprocessing for optimal speech synthesis
export function preprocessTextForSpeech(text: string, language: SupportedLanguage): string {
  let processedText = text

  // Remove markdown formatting
  processedText = processedText.replace(/\*\*(.*?)\*\*/g, '$1') // Bold
  processedText = processedText.replace(/\*(.*?)\*/g, '$1') // Italic
  processedText = processedText.replace(/`(.*?)`/g, '$1') // Code
  processedText = processedText.replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links

  // Remove extra whitespace and normalize
  processedText = processedText.replace(/\s+/g, ' ').trim()

  // Language-specific preprocessing for I Ching content
  switch (language) {
    case 'zh':
      // Chinese: Add proper pauses and handle characters
      processedText = processedText
        .replace(/([^\x00-\x7F])([^\x00-\x7F])/g, '$1 $2') // Space between Chinese characters
        .replace(/。|，|；|：|！|？/g, ' $& ') // Add spaces around punctuation
        .replace(/\s+/g, ' ') // Normalize spaces
      break
      
    case 'ja':
      // Japanese: Handle hiragana, katakana, and kanji properly
      processedText = processedText
        .replace(/([^\x00-\x7F])([^\x00-\x7F])/g, '$1 $2') // Space between Japanese characters
        .replace(/。|、|；|：|！|？/g, ' $& ') // Add spaces around punctuation
        .replace(/\s+/g, ' ') // Normalize spaces
      break
      
    case 'hi':
      // Hindi: Handle Devanagari script
      processedText = processedText
        .replace(/([^\x00-\x7F])([^\x00-\x7F])/g, '$1 $2') // Space between Devanagari characters
        .replace(/।|,|;|:|!|\?/g, ' $& ') // Add spaces around punctuation
        .replace(/\s+/g, ' ') // Normalize spaces
      break
      
    case 'en':
      // English: Optimize for philosophical/spiritual content
      processedText = processedText
        .replace(/\b(hexagram|trigram|yin|yang|dao|tao|qi|chi)\b/gi, (match) => {
          // Add slight pauses around key I Ching terms
          return ` ${match.toLowerCase()} `
        })
        .replace(/\./g, '. ') // Add pause after periods
        .replace(/,/g, ', ') // Add pause after commas
        .replace(/;/g, '; ') // Add pause after semicolons
        .replace(/:/g, ': ') // Add pause after colons
        .replace(/\s+/g, ' ') // Normalize spaces
      break
      
    case 'es':
      // Spanish: Handle philosophical terms
      processedText = processedText
        .replace(/\./g, '. ')
        .replace(/,/g, ', ')
        .replace(/;/g, '; ')
        .replace(/:/g, ': ')
        .replace(/\s+/g, ' ')
      break
      
    case 'fr':
      // French: Handle philosophical terms
      processedText = processedText
        .replace(/\./g, '. ')
        .replace(/,/g, ', ')
        .replace(/;/g, '; ')
        .replace(/:/g, ': ')
        .replace(/\s+/g, ' ')
      break
  }

  // Add strategic pauses for better comprehension of complex content
  processedText = processedText
    .replace(/\b(judgement|image|interpretation|meaning|significance)\b/gi, ' $& ')
    .replace(/\b(above|below|within|without|heaven|earth|fire|water|mountain|lake|wind|thunder)\b/gi, ' $& ')
    .replace(/\s+/g, ' ') // Final space normalization

  return processedText.trim()
}

// Create optimized text segments for I Ching audio
export function createAudioSegments(hexagram: any, language: SupportedLanguage): string[] {
  const segments: string[] = []
  
  // Segment 1: Introduction
  const name = getLocalizedText(hexagram.name, language)
  const chineseName = hexagram.chinese_name || hexagram.chineseName
  segments.push(`${name} ${chineseName ? `(${chineseName})` : ''}`)
  
  // Segment 2: Judgement (core meaning)
  const judgement = getLocalizedText(hexagram.judgement, language)
  if (judgement && judgement.length > 0) {
    segments.push(`Judgement: ${judgement}`)
  }
  
  // Segment 3: Image (symbolic meaning)
  const image = getLocalizedText(hexagram.image, language)
  if (image && image.length > 0) {
    segments.push(`Image: ${image}`)
  }
  
  // Segment 4: Interpretation (practical guidance)
  const interpretation = getLocalizedText(hexagram.interpretation, language)
  if (interpretation && interpretation.length > 0) {
    // Split long interpretations into smaller chunks
    const words = interpretation.split(' ')
    if (words.length > 50) {
      const midPoint = Math.floor(words.length / 2)
      segments.push(`Interpretation Part 1: ${words.slice(0, midPoint).join(' ')}`)
      segments.push(`Interpretation Part 2: ${words.slice(midPoint).join(' ')}`)
    } else {
      segments.push(`Interpretation: ${interpretation}`)
    }
  }
  
  return segments.filter(segment => segment.trim().length > 0)
}

// Helper function to get localized text
function getLocalizedText(textObj: any, language: SupportedLanguage): string {
  if (typeof textObj === 'string') return textObj
  if (typeof textObj === 'object' && textObj !== null) {
    return textObj[language] || textObj.en || textObj.zh || ''
  }
  return ''
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
