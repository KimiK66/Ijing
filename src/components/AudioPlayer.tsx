'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Loader2, SkipForward, SkipBack } from 'lucide-react'
import { SupportedLanguage } from '@/types'
import { cn } from '@/lib/utils'
import { createAudioSegments, preprocessTextForSpeech } from '@/lib/elevenlabs'

interface AudioPlayerProps {
  text: string
  language: SupportedLanguage
  className?: string
  autoPlay?: boolean
  hexagram?: any // Optional hexagram object for segmented audio
}

export function AudioPlayer({
  text,
  language,
  className,
  autoPlay = false,
  hexagram,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [currentSegment, setCurrentSegment] = useState(0)
  const [segments, setSegments] = useState<string[]>([])
  const [segmentUrls, setSegmentUrls] = useState<string[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Generate enhanced audio segments when text or hexagram changes
  useEffect(() => {
    if (hexagram && language) {
      // Use enhanced segmentation for hexagram audio
      const audioSegments = createAudioSegments(hexagram, language)
      setSegments(audioSegments)
      generateEnhancedSegmentAudio(audioSegments)
    } else if (text && language) {
      // Enhanced single text processing
      const processedText = preprocessTextForSpeech(text, language)
      setSegments([processedText])
      generateEnhancedSingleAudio(processedText)
    }
  }, [text, language, hexagram])

  // Cleanup audio URLs on unmount
  useEffect(() => {
    return () => {
      segmentUrls.forEach(url => URL.revokeObjectURL(url))
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [segmentUrls, audioUrl])

  const generateEnhancedSegmentAudio = async (audioSegments: string[]) => {
    setIsLoading(true)
    try {
      const urls: string[] = []
      
      for (let i = 0; i < audioSegments.length; i++) {
        const segment = audioSegments[i]
        // Enhanced preprocessing for more natural speech
        const processedText = preprocessTextForSpeech(segment, language)
        
        const response = await fetch('/api/text-to-speech', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: processedText,
            language,
            enhanced: true, // Flag for enhanced processing
          }),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || 'Failed to generate enhanced audio')
        }

        const audioBlob = await response.blob()
        const url = URL.createObjectURL(audioBlob)
        urls.push(url)
      }
      
      setSegmentUrls(urls)
      setCurrentSegment(0)
      
      if (autoPlay && urls.length > 0) {
        setIsPlaying(true)
      }
    } catch (error) {
      console.error('Error generating enhanced segment audio:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateEnhancedSingleAudio = async (singleText: string) => {
    setIsLoading(true)
    try {
      // Enhanced preprocessing for more natural speech
      const processedText = preprocessTextForSpeech(singleText, language)
      
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: processedText,
          language,
          enhanced: true, // Flag for enhanced processing
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to generate enhanced audio')
      }

      const audioBlob = await response.blob()
      const url = URL.createObjectURL(audioBlob)
      
      // Clean up previous URL
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
      
      setAudioUrl(url)
      
      if (autoPlay) {
        setIsPlaying(true)
      }
    } catch (error) {
      console.error('Error generating enhanced audio:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const togglePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const nextSegment = () => {
    if (currentSegment < segments.length - 1) {
      setCurrentSegment(currentSegment + 1)
      setIsPlaying(true)
    }
  }

  const previousSegment = () => {
    if (currentSegment > 0) {
      setCurrentSegment(currentSegment - 1)
      setIsPlaying(true)
    }
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleEnded = () => {
    if (segmentUrls.length > 0 && currentSegment < segments.length - 1) {
      // Auto-advance to next segment
      setCurrentSegment(currentSegment + 1)
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
      setCurrentTime(0)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Get current audio source
  const getCurrentAudioSrc = () => {
    if (segmentUrls.length > 0 && segmentUrls[currentSegment]) {
      return segmentUrls[currentSegment]
    }
    return audioUrl
  }

  return (
    <div className={cn('audio-player', className)}>
      {/* Audio element */}
      {getCurrentAudioSrc() && (
        <audio
          ref={audioRef}
          src={getCurrentAudioSrc() || undefined}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          preload="metadata"
        />
      )}

      {/* Controls */}
      <div className="flex items-center space-x-4">
        {/* Previous Segment Button (only for segmented audio) */}
        {segments.length > 1 && (
          <button
            onClick={previousSegment}
            disabled={isLoading || currentSegment === 0}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <SkipBack className="w-4 h-4 text-gray-500" />
          </button>
        )}

        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          disabled={isLoading || !getCurrentAudioSrc()}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 ml-0.5" />
          )}
        </button>

        {/* Next Segment Button (only for segmented audio) */}
        {segments.length > 1 && (
          <button
            onClick={nextSegment}
            disabled={isLoading || currentSegment === segments.length - 1}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <SkipForward className="w-4 h-4 text-gray-500" />
          </button>
        )}

        {/* Progress Bar */}
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground min-w-[40px]">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-200"
                style={{
                  width: duration ? `${(currentTime / duration) * 100}%` : '0%',
                }}
              />
            </div>
            <span className="text-xs text-muted-foreground min-w-[40px]">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-gray-500" />
          ) : (
            <Volume2 className="w-4 h-4 text-gray-500" />
          )}
        </button>
      </div>

      {/* Segment indicator and current text */}
      {segments.length > 1 && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Segment {currentSegment + 1} of {segments.length}
            </span>
            <div className="flex space-x-1">
              {segments.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'w-2 h-2 rounded-full',
                    index === currentSegment ? 'bg-primary' : 'bg-gray-300'
                  )}
                />
              ))}
            </div>
          </div>
          <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
            {segments[currentSegment]}
          </div>
        </div>
      )}

      {/* Language indicator */}
      <div className="mt-2 text-center">
        <span className="text-xs text-muted-foreground">
          Audio in {language.toUpperCase()}
        </span>
      </div>
    </div>
  )
}
