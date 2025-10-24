import { SupportedLanguage } from '@/types'

// Voice configuration for different languages - OPTIMIZED FOR HUMAN-LIKE SPEECH
export const VOICE_CONFIGS = {
  en: {
    voiceId: 'pNInz6obpgDQGcFmaJgB', // Adam (English) - Clear, authoritative, human-like
    modelId: 'eleven_multilingual_v2', // Best model for natural speech
    stability: 0.6, // Balanced for natural variation
    similarityBoost: 0.85, // High similarity for authentic voice
    style: 0.3, // Slight style for more natural delivery
    use_speaker_boost: true, // Enhanced clarity
  },
  zh: {
    voiceId: 'EXAVITQu4vr4xnSDxMaL', // Bella (Chinese) - Native Chinese speaker
    modelId: 'eleven_multilingual_v2',
    stability: 0.7, // Balanced for natural Chinese speech
    similarityBoost: 0.9, // Maximum similarity for authentic pronunciation
    style: 0.2, // Subtle style for philosophical content
    use_speaker_boost: true,
  },
  hi: {
    voiceId: 'VR6AewLTigWG4xSOukaG', // Josh (Hindi) - Good for Sanskrit-derived terms
    modelId: 'eleven_multilingual_v2',
    stability: 0.65,
    similarityBoost: 0.85,
    style: 0.25,
    use_speaker_boost: true,
  },
  es: {
    voiceId: 'TxGEqnHWrfWFTfGW9XjX', // Josh (Spanish) - Clear Spanish pronunciation
    modelId: 'eleven_multilingual_v2',
    stability: 0.65,
    similarityBoost: 0.85,
    style: 0.3,
    use_speaker_boost: true,
  },
  fr: {
    voiceId: 'VR6AewLTigWG4xSOukaG', // Josh (French) - Good for philosophical terms
    modelId: 'eleven_multilingual_v2',
    stability: 0.65,
    similarityBoost: 0.85,
    style: 0.25,
    use_speaker_boost: true,
  },
  ja: {
    voiceId: 'AZnzlk1XvdvUeBnXmlld', // Domi (Japanese) - Native Japanese speaker
    modelId: 'eleven_multilingual_v2',
    stability: 0.7, // Balanced for natural Japanese speech
    similarityBoost: 0.9, // Maximum similarity for authentic pronunciation
    style: 0.2, // Subtle style for philosophical content
    use_speaker_boost: true,
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

// Generate audio using ElevenLabs API with enhanced human-like settings
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
  const finalStability = stability !== 0.5 ? stability : config.stability
  const finalSimilarityBoost = similarityBoost !== 0.5 ? similarityBoost : config.similarityBoost

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
          stability: finalStability,
          similarity_boost: finalSimilarityBoost,
          style: config.style || 0.2,
          use_speaker_boost: config.use_speaker_boost || true,
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

// Advanced text preprocessing for human-like, meaningful speech
export function preprocessTextForSpeech(text: string, language: SupportedLanguage): string {
  let processedText = text

  // Remove all markdown formatting
  processedText = processedText.replace(/\*\*(.*?)\*\*/g, '$1') // Bold
  processedText = processedText.replace(/\*(.*?)\*/g, '$1') // Italic
  processedText = processedText.replace(/`(.*?)`/g, '$1') // Code
  processedText = processedText.replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links

  // Remove section headers that don't add meaning to speech
  processedText = processedText.replace(/^(judgement|image|interpretation|meaning|significance):\s*/gmi, '')
  processedText = processedText.replace(/^(timing|application|reflection|action):\s*/gmi, '')
  processedText = processedText.replace(/^(life area|emotional guidance|practical advice|spiritual message):\s*/gmi, '')
  
  // Remove common I Ching structural terms that don't add value in speech
  processedText = processedText.replace(/\b(hexagram|trigram)\s+\d+/gi, '')
  processedText = processedText.replace(/\b(above|below)\s+(heaven|earth|fire|water|mountain|lake|wind|thunder)\b/gi, '')
  
  // Clean up extra whitespace
  processedText = processedText.replace(/\s+/g, ' ').trim()

  // Language-specific optimization for natural speech
  switch (language) {
    case 'zh':
      // Chinese: Natural flow with proper pauses
      processedText = processedText
        .replace(/。|，|；|：|！|？/g, ' $& ') // Natural pauses around punctuation
        .replace(/\s+/g, ' ') // Normalize spaces
      break
      
    case 'ja':
      // Japanese: Natural flow with proper pauses
      processedText = processedText
        .replace(/。|、|；|：|！|？/g, ' $& ') // Natural pauses around punctuation
        .replace(/\s+/g, ' ') // Normalize spaces
      break
      
    case 'hi':
      // Hindi: Natural flow with proper pauses
      processedText = processedText
        .replace(/।|,|;|:|!|\?/g, ' $& ') // Natural pauses around punctuation
        .replace(/\s+/g, ' ') // Normalize spaces
      break
      
    case 'en':
      // English: Natural conversational flow
      processedText = processedText
        .replace(/\./g, '. ') // Natural pause after periods
        .replace(/,/g, ', ') // Natural pause after commas
        .replace(/;/g, '; ') // Natural pause after semicolons
        .replace(/:/g, ': ') // Natural pause after colons
        .replace(/\s+/g, ' ') // Normalize spaces
        // Add natural emphasis to key concepts
        .replace(/\b(this hexagram|this guidance|this wisdom|this message)\b/gi, ' $& ')
      break
      
    case 'es':
      // Spanish: Natural conversational flow
      processedText = processedText
        .replace(/\./g, '. ')
        .replace(/,/g, ', ')
        .replace(/;/g, '; ')
        .replace(/:/g, ': ')
        .replace(/\s+/g, ' ')
        .replace(/\b(este hexagrama|esta guía|esta sabiduría|este mensaje)\b/gi, ' $& ')
      break
      
    case 'fr':
      // French: Natural conversational flow
      processedText = processedText
        .replace(/\./g, '. ')
        .replace(/,/g, ', ')
        .replace(/;/g, '; ')
        .replace(/:/g, ': ')
        .replace(/\s+/g, ' ')
        .replace(/\b(ce hexagramme|cette guidance|cette sagesse|ce message)\b/gi, ' $& ')
      break
  }

  // Final cleanup for natural speech flow
  processedText = processedText
    .replace(/\s+/g, ' ') // Final space normalization
    .replace(/^\s*[.,;:]\s*/g, '') // Remove leading punctuation
    .trim()

  return processedText
}

// Create intelligent, meaningful audio segments focused on valuable content
export function createAudioSegments(hexagram: any, language: SupportedLanguage): string[] {
  const segments: string[] = []
  
  // Helper function to get localized text
  const getLocalizedText = (textObj: any, lang: SupportedLanguage): string => {
    if (typeof textObj === 'string') return textObj
    if (typeof textObj === 'object' && textObj !== null) {
      return textObj[lang] || textObj.en || textObj.zh || ''
    }
    return ''
  }

  // Segment 1: Natural introduction with hexagram name
  const name = getLocalizedText(hexagram.name, language)
  const chineseName = hexagram.chinese_name || hexagram.chineseName
  
  // Create natural introduction based on language
  const introductions = {
    en: `You have drawn ${name}. ${chineseName ? `In Chinese, this is called ${chineseName}.` : ''}`,
    zh: `你抽到了${name}。${chineseName ? `中文名称为${chineseName}。` : ''}`,
    hi: `आपने ${name} निकाला है। ${chineseName ? `चीनी में इसे ${chineseName} कहते हैं।` : ''}`,
    es: `Has sacado ${name}. ${chineseName ? `En chino, esto se llama ${chineseName}.` : ''}`,
    fr: `Vous avez tiré ${name}. ${chineseName ? `En chinois, cela s'appelle ${chineseName}.` : ''}`,
    ja: `あなたは${name}を引きました。${chineseName ? `中国語では${chineseName}と呼ばれます。` : ''}`
  }
  
  segments.push(introductions[language] || introductions.en)
  
  // Segment 2: Core wisdom (focus on interpretation as it's most valuable)
  const interpretation = getLocalizedText(hexagram.interpretation, language)
  if (interpretation && interpretation.length > 0) {
    // Clean and optimize the interpretation for natural speech
    let cleanInterpretation = interpretation
      .replace(/^(interpretation|meaning|guidance):\s*/gmi, '')
      .replace(/\b(this hexagram|the hexagram)\b/gi, 'this guidance')
      .trim()
    
    // Add natural introduction based on language
    const interpretationIntros = {
      en: `Here is the wisdom for you: ${cleanInterpretation}`,
      zh: `这是给你的智慧：${cleanInterpretation}`,
      hi: `यहाँ आपके लिए ज्ञान है: ${cleanInterpretation}`,
      es: `Aquí está la sabiduría para ti: ${cleanInterpretation}`,
      fr: `Voici la sagesse pour vous: ${cleanInterpretation}`,
      ja: `あなたへの知恵はこれです：${cleanInterpretation}`
    }
    
    segments.push(interpretationIntros[language] || interpretationIntros.en)
  }
  
  // Segment 3: Practical application (if available)
  const judgement = getLocalizedText(hexagram.judgement, language)
  if (judgement && judgement.length > 0 && judgement !== interpretation) {
    // Only add if it's different from interpretation and adds value
    let cleanJudgement = judgement
      .replace(/^(judgement|core meaning):\s*/gmi, '')
      .replace(/\b(this hexagram|the hexagram)\b/gi, 'this guidance')
      .trim()
    
    // Add natural transition
    const judgementIntros = {
      en: `The core message is: ${cleanJudgement}`,
      zh: `核心信息是：${cleanJudgement}`,
      hi: `मुख्य संदेश यह है: ${cleanJudgement}`,
      es: `El mensaje central es: ${cleanJudgement}`,
      fr: `Le message central est: ${cleanJudgement}`,
      ja: `核心メッセージは：${cleanJudgement}`
    }
    
    segments.push(judgementIntros[language] || judgementIntros.en)
  }
  
  // Segment 4: Closing guidance
  const closings = {
    en: `Take time to reflect on this guidance and how it applies to your life. Trust your inner wisdom as you move forward.`,
    zh: `花时间思考这个指导以及它如何适用于你的生活。在前进的道路上，相信你内在的智慧。`,
    hi: `इस मार्गदर्शन पर विचार करने का समय लें और यह आपके जीवन पर कैसे लागू होता है। आगे बढ़ते समय अपने आंतरिक ज्ञान पर भरोसा करें।`,
    es: `Tómate tiempo para reflexionar sobre esta guía y cómo se aplica a tu vida. Confía en tu sabiduría interior mientras avanzas.`,
    fr: `Prenez le temps de réfléchir à cette guidance et à la façon dont elle s'applique à votre vie. Faites confiance à votre sagesse intérieure en avançant.`,
    ja: `この指導について考え、それがあなたの人生にどのように適用されるかを考える時間を取ってください。前進する際は、あなたの内なる知恵を信頼してください。`
  }
  
  segments.push(closings[language] || closings.en)
  
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
