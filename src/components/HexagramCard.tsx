'use client'

import { HexagramTranslation, SupportedLanguage } from '@/types'
import { getLocalizedText } from '@/lib/hexagrams'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface HexagramCardProps {
  hexagram: HexagramTranslation
  language: SupportedLanguage
  onClick?: () => void
  className?: string
  showDetails?: boolean
}

export function HexagramCard({
  hexagram,
  language,
  onClick,
  className,
  showDetails = false,
}: HexagramCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const name = getLocalizedText(hexagram.name, language)
  const keywords = getLocalizedText(hexagram.keywords, language)
  const keywordsList = keywords.split(',').map(k => k.trim()).slice(0, 3)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'hexagram-card cursor-pointer p-6 transition-all duration-300',
        isHovered && 'transform scale-105',
        className
      )}
    >
      {/* Hexagram Number and Name */}
      <div className="text-center mb-4">
        <div className="text-2xl font-bold text-gray-800 mb-1">
          {hexagram.number}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {name}
        </h3>
        <p className="text-sm text-gray-600 chinese-text">
          {hexagram.chinese_name || hexagram.chineseName}
        </p>
      </div>

      {/* Hexagram Symbol */}
      <div className="flex justify-center mb-4">
        <div className="space-y-1">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="flex justify-center">
              {i % 2 === 0 ? (
                <div className="w-12 h-1 bg-gray-800"></div>
              ) : (
                <div className="flex space-x-1">
                  <div className="w-4 h-1 bg-gray-800"></div>
                  <div className="w-4 h-1 bg-gray-800"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Trigrams */}
      <div className="text-center mb-4">
        <div className="text-sm text-gray-600">
          {hexagram.lower_trigram || hexagram.lowerTrigram} {hexagram.upper_trigram || hexagram.upperTrigram}
        </div>
      </div>

      {/* Keywords */}
      {showDetails && (
        <div className="space-y-3">
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-2">Keywords</div>
            <div className="flex flex-wrap justify-center gap-1">
              {keywordsList.map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Element and Season */}
      {showDetails && (
        <div className="flex justify-between text-xs text-gray-500 mt-3 pt-3 border-t border-amber-200">
          <span>{hexagram.element}</span>
          <span>{hexagram.season}</span>
        </div>
      )}
    </div>
  )
}
