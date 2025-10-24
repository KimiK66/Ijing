'use client'

import { HexagramTranslation, SupportedLanguage } from '@/types'
import { getLocalizedText } from '@/lib/hexagrams'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface HexagramDisplayProps {
  hexagram: HexagramTranslation
  language: SupportedLanguage
  showLines?: boolean
  className?: string
}

export function HexagramDisplay({
  hexagram,
  language,
  showLines = true,
  className,
}: HexagramDisplayProps) {
  const name = getLocalizedText(hexagram.name, language)
  const judgement = getLocalizedText(hexagram.judgement, language)
  const image = getLocalizedText(hexagram.image, language)
  const interpretation = getLocalizedText(hexagram.interpretation, language)

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="text-center">
        <div className="text-4xl font-bold text-gray-800 mb-2">
          {hexagram.number}
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {name}
        </h1>
        <p className="text-lg text-gray-600 chinese-text">
          {hexagram.chineseName}
        </p>
        <div className="text-sm text-gray-500 mt-2">
          {hexagram.lowerTrigram} {hexagram.upperTrigram}
        </div>
      </div>

      {/* Hexagram Symbol */}
      {showLines && (
        <div className="flex justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
            <div className="space-y-2">
              {Array.from({ length: 6 }, (_, i) => {
                const lineIndex = 5 - i // Reverse order for display
                const line = hexagram.lines[lineIndex]
                return (
                  <div key={i} className="flex justify-center">
                    {line?.changing ? (
                      <div className="w-16 h-2 bg-gray-800 rounded"></div>
                    ) : (
                      <div className="flex space-x-1">
                        <div className="w-6 h-2 bg-gray-800 rounded"></div>
                        <div className="w-6 h-2 bg-gray-800 rounded"></div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Judgement */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Judgement</h2>
        <p className="text-gray-700 leading-relaxed">{judgement}</p>
      </div>

      {/* Image */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Image</h2>
        <p className="text-gray-700 leading-relaxed">{image}</p>
      </div>

      {/* Interpretation */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Interpretation</h2>
        <p className="text-gray-700 leading-relaxed">{interpretation}</p>
      </div>

      {/* Lines */}
      {showLines && hexagram.lines && hexagram.lines.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Lines</h2>
          <div className="space-y-4">
            {hexagram.lines.map((line, index) => (
              <div key={index} className="border-l-4 border-purple-300 pl-4">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-purple-700 mr-2">
                    Line {line.lineNumber}
                  </span>
                  {line.changing && (
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                      Changing
                    </span>
                  )}
                </div>
                <p className="text-gray-700 text-sm mb-1">
                  {getLocalizedText(line.text, language)}
                </p>
                <p className="text-gray-600 text-xs italic">
                  {getLocalizedText(line.meaning, language)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Keywords and Attributes */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {getLocalizedText(hexagram.keywords, language)
              .split(',')
              .map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full"
                >
                  {keyword.trim()}
                </span>
              ))}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Attributes</h3>
          <div className="space-y-2 text-sm">
            <div><span className="font-medium">Element:</span> {hexagram.element}</div>
            <div><span className="font-medium">Season:</span> {hexagram.season}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
