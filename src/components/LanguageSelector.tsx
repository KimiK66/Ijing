'use client'

import { useApp } from '@/app/providers'
import { LANGUAGES, SupportedLanguage } from '@/lib/hexagrams'
import { Globe } from 'lucide-react'
import { useState } from 'react'

export function LanguageSelector() {
  const { language, setLanguage } = useApp()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = LANGUAGES[language]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-gray-300 transition-colors"
      >
        <Globe className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          {currentLanguage.flag} {currentLanguage.name}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="py-1">
              {Object.entries(LANGUAGES).map(([code, config]) => (
                <button
                  key={code}
                  onClick={() => {
                    setLanguage(code as SupportedLanguage)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center space-x-3 ${
                    code === language ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  <span className="text-lg">{config.flag}</span>
                  <div>
                    <div className="font-medium">{config.name}</div>
                    <div className="text-xs text-gray-500">{config.nativeName}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
