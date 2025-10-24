import { HexagramTranslation, SupportedLanguage } from '@/types'

// Re-export types for convenience
export type { SupportedLanguage }

// Language configuration
export const LANGUAGES = {
  en: { name: 'English', nativeName: 'English', flag: '🇺🇸' },
  zh: { name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  es: { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  fr: { name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  ja: { name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
} as const

// Trigram configurations
export const TRIGRAMS = {
  '☰': { name: 'Heaven', chinese: '天', element: 'Metal', family: 'Father' },
  '☱': { name: 'Lake', chinese: '泽', element: 'Metal', family: 'Youngest Daughter' },
  '☲': { name: 'Fire', chinese: '火', element: 'Fire', family: 'Middle Daughter' },
  '☳': { name: 'Thunder', chinese: '雷', element: 'Wood', family: 'Eldest Son' },
  '☴': { name: 'Wind', chinese: '风', element: 'Wood', family: 'Eldest Daughter' },
  '☵': { name: 'Water', chinese: '水', element: 'Water', family: 'Middle Son' },
  '☶': { name: 'Mountain', chinese: '山', element: 'Earth', family: 'Youngest Son' },
  '☷': { name: 'Earth', chinese: '地', element: 'Earth', family: 'Mother' },
} as const

// Utility functions
export function getTrigramInfo(symbol: string) {
  return TRIGRAMS[symbol as keyof typeof TRIGRAMS] || null
}

export function getLocalizedText(
  multiLanguageText: Record<string, string>,
  language: SupportedLanguage,
  fallbackLanguage: SupportedLanguage = 'en'
): string {
  return multiLanguageText[language] || multiLanguageText[fallbackLanguage] || ''
}

export function generateHexagramId(number: number): string {
  return `hexagram-${number.toString().padStart(2, '0')}`
}

export function parseHexagramNumber(id: string): number {
  const match = id.match(/hexagram-(\d+)/)
  return match ? parseInt(match[1], 10) : 0
}

// Hexagram line rendering
export function renderHexagramLines(hexagram: HexagramTranslation): string[] {
  const lines = []
  for (let i = 6; i >= 1; i--) {
    const line = hexagram.lines.find(l => l.lineNumber === i)
    if (line) {
      lines.push(line.changing ? '⚊' : '⚋') // Solid or broken line
    }
  }
  return lines
}

// Search and filter utilities
export function searchHexagrams(
  hexagrams: HexagramTranslation[],
  query: string,
  language: SupportedLanguage
): HexagramTranslation[] {
  if (!query.trim()) return hexagrams

  const lowercaseQuery = query.toLowerCase()
  
  return hexagrams.filter(hexagram => {
    const name = getLocalizedText(hexagram.name, language).toLowerCase()
    const keywords = getLocalizedText(hexagram.keywords, language).toLowerCase()
    const interpretation = getLocalizedText(hexagram.interpretation, language).toLowerCase()
    
    return (
      name.includes(lowercaseQuery) ||
      keywords.includes(lowercaseQuery) ||
      interpretation.includes(lowercaseQuery) ||
      hexagram.number.toString().includes(query)
    )
  })
}

export function filterHexagramsByElement(
  hexagrams: HexagramTranslation[],
  element: string
): HexagramTranslation[] {
  if (!element) return hexagrams
  return hexagrams.filter(hexagram => hexagram.element === element)
}

export function filterHexagramsBySeason(
  hexagrams: HexagramTranslation[],
  season: string
): HexagramTranslation[] {
  if (!season) return hexagrams
  return hexagrams.filter(hexagram => hexagram.season === season)
}

// Random hexagram selection
export function getRandomHexagram(hexagrams: HexagramTranslation[]): HexagramTranslation {
  const randomIndex = Math.floor(Math.random() * hexagrams.length)
  return hexagrams[randomIndex]
}

// Hexagram validation
export function validateHexagram(hexagram: Partial<HexagramTranslation>): boolean {
  return !!(
    hexagram.id &&
    hexagram.number &&
    hexagram.name &&
    hexagram.chineseName &&
    hexagram.upperTrigram &&
    hexagram.lowerTrigram &&
    hexagram.judgement &&
    hexagram.image &&
    hexagram.lines &&
    hexagram.interpretation &&
    hexagram.keywords
  )
}

// Format utilities
export function formatHexagramDisplay(
  hexagram: HexagramTranslation,
  language: SupportedLanguage
): {
  number: number
  name: string
  chineseName: string
  trigrams: string
  judgement: string
  image: string
  interpretation: string
  keywords: string[]
} {
  return {
    number: hexagram.number,
    name: getLocalizedText(hexagram.name, language),
    chineseName: hexagram.chineseName,
    trigrams: `${hexagram.lowerTrigram}${hexagram.upperTrigram}`,
    judgement: getLocalizedText(hexagram.judgement, language),
    image: getLocalizedText(hexagram.image, language),
    interpretation: getLocalizedText(hexagram.interpretation, language),
    keywords: getLocalizedText(hexagram.keywords, language).split(',').map(k => k.trim()),
  }
}
