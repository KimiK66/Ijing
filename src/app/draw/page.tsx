'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Shuffle, ArrowLeft, BookOpen, Volume2, Lightbulb, Clock, Target, Heart, Star, Zap, Info, Save } from 'lucide-react'
import { HexagramDisplay } from '@/components/HexagramDisplay'
import { AudioPlayer } from '@/components/AudioPlayer'
import { LanguageSelector } from '@/components/LanguageSelector'
import { useApp } from '@/app/providers'
import { HexagramTranslation } from '@/types'
import { getLocalizedText } from '@/lib/hexagrams'
import hexagramsData from '@/data/complete-hexagrams.json'
import { createSupabaseClient } from '@/lib/supabase'

export default function DrawPage() {
  const { language } = useApp()
  const [hexagrams, setHexagrams] = useState<HexagramTranslation[]>([])
  const [drawnHexagram, setDrawnHexagram] = useState<HexagramTranslation | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [drawHistory, setDrawHistory] = useState<HexagramTranslation[]>([])
  const [showDetailedInterpretation, setShowDetailedInterpretation] = useState(false)
  const [isSavingReading, setIsSavingReading] = useState(false)
  const [question, setQuestion] = useState('')
  const [context, setContext] = useState('')

  const supabase = createSupabaseClient()

  // Load hexagrams data
  useEffect(() => {
    const loadHexagrams = async () => {
      try {
        console.log('Loading hexagrams data for draw page...')
        console.log('Data:', hexagramsData)
        // Use the imported hexagrams data directly
        setHexagrams(hexagramsData as HexagramTranslation[])
        console.log('Hexagrams loaded for draw:', hexagramsData.length)
      } catch (error) {
        console.error('Error loading hexagrams:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadHexagrams()
  }, [])

  const drawHexagram = () => {
    if (hexagrams.length === 0) return

    setIsDrawing(true)
    setShowDetailedInterpretation(false)
    
    // Enhanced drawing animation with more realistic timing
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * hexagrams.length)
      const newHexagram = hexagrams[randomIndex]
      setDrawnHexagram(newHexagram)
      
      // Add to history
      setDrawHistory(prev => [newHexagram, ...prev.slice(0, 4)]) // Keep last 5 draws
      
      setIsDrawing(false)
    }, 2000) // Longer animation for better experience
  }

  const getDetailedGuidance = (hexagram: HexagramTranslation) => {
    // Get detailed guidance from database if available
    if (hexagram.detailed_guidance) {
      return hexagram.detailed_guidance[language] || hexagram.detailed_guidance.en || {
        timing: "The timing of this hexagram aligns with your current circumstances.",
        application: "Consider how this hexagram applies to your situation.",
        reflection: "Take time to contemplate the message of this hexagram.",
        action: "Based on this hexagram's guidance, consider your next steps."
      }
    }
    
    // Fallback guidance if not in database yet
    const guidance: Record<string, any> = {
      en: {
        timing: "This hexagram represents the current moment in your life's journey.",
        application: "Consider how the themes of this hexagram apply to your current challenges.",
        reflection: "Take time to meditate on this hexagram's message.",
        action: "Based on this hexagram's guidance, consider what actions might be beneficial."
      },
      zh: {
        timing: "这个卦象代表你人生旅程中的当前时刻。",
        application: "考虑这个卦象的主题如何适用于你当前的挑战。",
        reflection: "花时间冥想这个卦象的信息。",
        action: "基于这个卦象的指导，考虑什么行动可能有益。"
      }
    }
    
    return guidance[language] || guidance.en
  }

  const getPersonalInsights = (hexagram: HexagramTranslation) => {
    // Get personal insights from database if available
    if (hexagram.personal_insights) {
      return hexagram.personal_insights[language] || hexagram.personal_insights.en || {
        lifeArea: "This hexagram relates to your personal development.",
        emotionalGuidance: "Consider your emotional state.",
        practicalAdvice: "Apply practical wisdom.",
        spiritualMessage: "Connect with spiritual meaning."
      }
    }
    
    // Fallback insights if not in database yet
    const insights: Record<string, any> = {
      en: {
        lifeArea: "This hexagram relates to your personal development.",
        emotionalGuidance: "Consider your emotional state.",
        practicalAdvice: "Apply practical wisdom.",
        spiritualMessage: "Connect with spiritual meaning."
      },
      zh: {
        lifeArea: "这个卦象与你的个人发展相关。",
        emotionalGuidance: "考虑你的情感状态。",
        practicalAdvice: "应用实际智慧。",
        spiritualMessage: "连接精神意义。"
      }
    }
    
    return insights[language] || insights.en
  }

  const saveReading = async () => {
    if (!drawnHexagram) return

    try {
      setIsSavingReading(true)
      
      // Get current session user
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        alert('Please sign in to save your reading')
        return
      }

      const { data, error } = await supabase
        .from('user_readings')
        .insert({
          user_id: session.user.id,
          hexagram_id: drawnHexagram.id,
          question: question.trim() || null,
          context: context.trim() || null
        })
        .select()
        .single()

      if (error) {
        console.error('Error saving reading:', error)
        alert('Failed to save reading. Please try again.')
      } else {
        console.log('Reading saved successfully:', data)
        alert('Reading saved successfully! You can view it in your profile.')
        setQuestion('')
        setContext('')
      }
    } catch (error) {
      console.error('Error saving reading:', error)
      alert('Failed to save reading. Please try again.')
    } finally {
      setIsSavingReading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {language === 'zh' ? '正在加载易经智慧...' :
             language === 'hi' ? 'आई चिंग की बुद्धि लोड हो रही है...' :
             language === 'es' ? 'Cargando la sabiduría del I Ching...' :
             language === 'fr' ? 'Chargement de la sagesse du I Ching...' :
             language === 'ja' ? '易経の知恵を読み込み中...' :
             'Loading the wisdom of the I Ching...'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-700 hover:text-amber-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>
                  {language === 'zh' ? '首页' :
                   language === 'hi' ? 'होम' :
                   language === 'es' ? 'Inicio' :
                   language === 'fr' ? 'Accueil' :
                   language === 'ja' ? 'ホーム' :
                   'Home'}
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/about"
                className="flex items-center space-x-2 text-gray-700 hover:text-amber-600 transition-colors"
              >
                <Info className="w-5 h-5" />
                <span>
                  {language === 'zh' ? '什么是易经？' :
                   language === 'hi' ? 'आई चिंग क्या है?' :
                   language === 'es' ? '¿Qué es el I Ching?' :
                   language === 'fr' ? 'Qu\'est-ce que le I Ching ?' :
                   language === 'ja' ? '易経とは？' :
                   'What is I Ching?'}
                </span>
              </Link>
              <LanguageSelector />
              <Link
                href="/hexagrams"
                className="flex items-center space-x-2 text-gray-700 hover:text-amber-600 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                <span>
                  {language === 'zh' ? '浏览全部' :
                   language === 'hi' ? 'सभी ब्राउज़ करें' :
                   language === 'es' ? 'Explorar Todos' :
                   language === 'fr' ? 'Explorer Tous' :
                   language === 'ja' ? 'すべてを閲覧' :
                   'Browse All'}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'zh' ? '易经随机抽取' : 
             language === 'hi' ? 'आई चिंग रैंडम ड्रॉ' :
             language === 'es' ? 'Sorteo Aleatorio del I Ching' :
             language === 'fr' ? 'Tirage Aléatoire du I Ching' :
             language === 'ja' ? '易経ランダムドロー' :
             'I Ching Random Draw'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'zh' ? '让古老的智慧指导你的人生道路。点击下方按钮，从64卦中随机抽取一卦，获得深刻的洞察和指导。' :
             language === 'hi' ? 'प्राचीन ज्ञान को आपके जीवन पथ का मार्गदर्शन करने दें। नीचे दिए गए बटन पर क्लिक करें और 64 हेक्साग्राम में से एक को यादृच्छिक रूप से चुनें।' :
             language === 'es' ? 'Deja que la sabiduría antigua guíe tu camino de vida. Haz clic en el botón de abajo para dibujar aleatoriamente uno de los 64 hexagramas.' :
             language === 'fr' ? 'Laissez l\'ancienne sagesse guider votre chemin de vie. Cliquez sur le bouton ci-dessous pour tirer au hasard l\'un des 64 hexagrammes.' :
             language === 'ja' ? '古代の知恵にあなたの人生の道を導かせてください。下のボタンをクリックして、64卦からランダムに1つを選んでください。' :
             'Let ancient wisdom guide your life path. Click the button below to randomly draw one of the 64 hexagrams for profound insights and guidance.'}
          </p>
        </div>

        {/* Drawing Section */}
        {!drawnHexagram && !isDrawing && (
          <div className="text-center mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shuffle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'zh' ? '准备抽取' :
                 language === 'hi' ? 'ड्रॉ के लिए तैयार' :
                 language === 'es' ? 'Listo para Dibujar' :
                 language === 'fr' ? 'Prêt à Tirer' :
                 language === 'ja' ? 'ドローの準備' :
                 'Ready to Draw'}
              </h2>
              <p className="text-gray-600 mb-8">
                {language === 'zh' ? '静心片刻，思考你心中的问题，然后点击按钮让易经为你提供指导。' :
                 language === 'hi' ? 'एक पल के लिए शांत हो जाएं, अपने दिल में प्रश्न पर विचार करें, फिर मार्गदर्शन के लिए बटन पर क्लिक करें।' :
                 language === 'es' ? 'Tómate un momento para centrarte, considera la pregunta en tu corazón, luego haz clic en el botón para recibir orientación.' :
                 language === 'fr' ? 'Prenez un moment pour vous centrer, considérez la question dans votre cœur, puis cliquez sur le bouton pour recevoir des conseils.' :
                 language === 'ja' ? '少し時間を取って心を落ち着け、心の中の質問を考えてから、ボタンをクリックして導きを受け取ってください。' :
                 'Take a moment to center yourself, consider the question in your heart, then click the button to receive guidance.'}
              </p>
              <button
                onClick={drawHexagram}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Shuffle className="w-6 h-6 inline mr-2" />
                {language === 'zh' ? '抽取卦象' :
                 language === 'hi' ? 'हेक्साग्राम ड्रॉ करें' :
                 language === 'es' ? 'Dibujar Hexagrama' :
                 language === 'fr' ? 'Tirer Hexagramme' :
                 language === 'ja' ? '卦を引く' :
                 'Draw Hexagram'}
              </button>
            </div>
          </div>
        )}

        {/* Drawing Animation */}
        {isDrawing && (
          <div className="text-center mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Shuffle className="w-12 h-12 text-white animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'zh' ? '正在抽取...' :
                 language === 'hi' ? 'ड्रॉ हो रहा है...' :
                 language === 'es' ? 'Dibujando...' :
                 language === 'fr' ? 'Tirage en cours...' :
                 language === 'ja' ? 'ドロー中...' :
                 'Drawing...'}
              </h2>
              <p className="text-gray-600">
                {language === 'zh' ? '易经正在为你选择最合适的卦象...' :
                 language === 'hi' ? 'आई चिंग आपके लिए सबसे उपयुक्त हेक्साग्राम चुन रहा है...' :
                 language === 'es' ? 'El I Ching está seleccionando el hexagrama más apropiado para ti...' :
                 language === 'fr' ? 'Le I Ching sélectionne l\'hexagramme le plus approprié pour vous...' :
                 language === 'ja' ? '易経があなたに最も適した卦を選んでいます...' :
                 'The I Ching is selecting the most appropriate hexagram for you...'}
              </p>
            </div>
          </div>
        )}

        {/* Drawn Hexagram */}
        {drawnHexagram && (
          <div className="space-y-8">
            {/* Hexagram Display */}
            <HexagramDisplay
              hexagram={drawnHexagram}
              language={language}
              className="mb-8"
            />

            {/* Enhanced Audio Player */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <Volume2 className="w-6 h-6 text-amber-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  {language === 'zh' ? '聆听解读' :
                   language === 'hi' ? 'व्याख्या सुनें' :
                   language === 'es' ? 'Escuchar Interpretación' :
                   language === 'fr' ? 'Écouter l\'Interprétation' :
                   language === 'ja' ? '解釈を聞く' :
                   'Listen to Interpretation'}
                </h2>
              </div>
              <AudioPlayer
                text={`${getLocalizedText(drawnHexagram.judgement, language)} ${getLocalizedText(drawnHexagram.image, language)} ${getLocalizedText(drawnHexagram.interpretation, language)}`}
                language={language}
                hexagram={drawnHexagram}
                className="w-full"
              />
            </div>

            {/* Detailed Guidance Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Lightbulb className="w-6 h-6 text-amber-600 mr-2" />
                  {language === 'zh' ? '详细指导' :
                   language === 'hi' ? 'विस्तृत मार्गदर्शन' :
                   language === 'es' ? 'Guía Detallada' :
                   language === 'fr' ? 'Guide Détaillé' :
                   language === 'ja' ? '詳細なガイダンス' :
                   'Detailed Guidance'}
                </h2>
                <button
                  onClick={() => setShowDetailedInterpretation(!showDetailedInterpretation)}
                  className="text-amber-600 hover:text-amber-700 font-medium"
                >
                  {showDetailedInterpretation ? 
                    (language === 'zh' ? '收起' : language === 'hi' ? 'छुपाएं' : language === 'es' ? 'Contraer' : language === 'fr' ? 'Réduire' : language === 'ja' ? '折りたたむ' : 'Collapse') :
                    (language === 'zh' ? '展开' : language === 'hi' ? 'विस्तार' : language === 'es' ? 'Expandir' : language === 'fr' ? 'Développer' : language === 'ja' ? '展開' : 'Expand')
                  }
                </button>
              </div>
              
              {showDetailedInterpretation && (
                <div className="space-y-6">
                  {Object.entries(getDetailedGuidance(drawnHexagram)).map(([key, value]) => (
                    <div key={key} className="border-l-4 border-amber-400 pl-4">
                      <div className="flex items-center mb-2">
                        {key === 'timing' && <Clock className="w-5 h-5 text-amber-600 mr-2" />}
                        {key === 'application' && <Target className="w-5 h-5 text-amber-600 mr-2" />}
                        {key === 'reflection' && <Heart className="w-5 h-5 text-amber-600 mr-2" />}
                        {key === 'action' && <Lightbulb className="w-5 h-5 text-amber-600 mr-2" />}
                        <h3 className="font-semibold text-gray-900 capitalize">
                          {key === 'timing' ? (language === 'zh' ? '时机' : language === 'hi' ? 'समय' : language === 'es' ? 'Momento' : language === 'fr' ? 'Moment' : language === 'ja' ? 'タイミング' : 'Timing') :
                           key === 'application' ? (language === 'zh' ? '应用' : language === 'hi' ? 'अनुप्रयोग' : language === 'es' ? 'Aplicación' : language === 'fr' ? 'Application' : language === 'ja' ? '適用' : 'Application') :
                           key === 'reflection' ? (language === 'zh' ? '反思' : language === 'hi' ? 'चिंतन' : language === 'es' ? 'Reflexión' : language === 'fr' ? 'Réflexion' : language === 'ja' ? '反省' : 'Reflection') :
                           (language === 'zh' ? '行动' : language === 'hi' ? 'कार्य' : language === 'es' ? 'Acción' : language === 'fr' ? 'Action' : language === 'ja' ? '行動' : 'Action')}
                        </h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{String(value)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Personal Insights Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Star className="w-6 h-6 text-amber-600 mr-2" />
                {language === 'zh' ? '个人洞察' :
                 language === 'hi' ? 'व्यक्तिगत अंतर्दृष्टि' :
                 language === 'es' ? 'Perspectivas Personales' :
                 language === 'fr' ? 'Perspectives Personnelles' :
                 language === 'ja' ? '個人的洞察' :
                 'Personal Insights'}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(getPersonalInsights(drawnHexagram)).map(([key, value]) => (
                  <div key={key} className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      {key === 'lifeArea' && <Target className="w-5 h-5 text-amber-600 mr-2" />}
                      {key === 'emotionalGuidance' && <Heart className="w-5 h-5 text-amber-600 mr-2" />}
                      {key === 'practicalAdvice' && <Lightbulb className="w-5 h-5 text-amber-600 mr-2" />}
                      {key === 'spiritualMessage' && <Zap className="w-5 h-5 text-amber-600 mr-2" />}
                      <h3 className="font-semibold text-gray-900">
                        {key === 'lifeArea' ? (language === 'zh' ? '生活领域' : language === 'hi' ? 'जीवन क्षेत्र' : language === 'es' ? 'Área de Vida' : language === 'fr' ? 'Domaine de Vie' : language === 'ja' ? '生活領域' : 'Life Area') :
                         key === 'emotionalGuidance' ? (language === 'zh' ? '情感指导' : language === 'hi' ? 'भावनात्मक मार्गदर्शन' : language === 'es' ? 'Guía Emocional' : language === 'fr' ? 'Guidance Émotionnelle' : language === 'ja' ? '感情的なガイダンス' : 'Emotional Guidance') :
                         key === 'practicalAdvice' ? (language === 'zh' ? '实用建议' : language === 'hi' ? 'व्यावहारिक सलाह' : language === 'es' ? 'Consejo Práctico' : language === 'fr' ? 'Conseil Pratique' : language === 'ja' ? '実用的なアドバイス' : 'Practical Advice') :
                         (language === 'zh' ? '精神信息' : language === 'hi' ? 'आध्यात्मिक संदेश' : language === 'es' ? 'Mensaje Espiritual' : language === 'fr' ? 'Message Spirituel' : language === 'ja' ? 'スピリチュアルメッセージ' : 'Spiritual Message')}
                      </h3>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{String(value)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Draw History */}
            {drawHistory.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {language === 'zh' ? '抽取历史' :
                   language === 'hi' ? 'ड्रॉ इतिहास' :
                   language === 'es' ? 'Historial de Sorteos' :
                   language === 'fr' ? 'Historique des Tirages' :
                   language === 'ja' ? 'ドロー履歴' :
                   'Draw History'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {drawHistory.map((hexagram, index) => (
                    <div key={`${hexagram.id}-${index}`} className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">
                        {language === 'zh' ? '卦' : language === 'hi' ? 'हेक्साग्राम' : language === 'es' ? 'Hexagrama' : language === 'fr' ? 'Hexagramme' : language === 'ja' ? '卦' : 'Hexagram'} {hexagram.number}
                      </div>
                      <div className="font-semibold text-gray-900">
                        {getLocalizedText(hexagram.name, language)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {hexagram.chinese_name || hexagram.chineseName}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Save Reading Form */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Save className="w-6 h-6 text-green-600 mr-2" />
                {language === 'zh' ? '保存这次抽取' :
                 language === 'hi' ? 'इस ड्रॉ को सेव करें' :
                 language === 'es' ? 'Guardar este Sorteo' :
                 language === 'fr' ? 'Sauvegarder ce Tirage' :
                 language === 'ja' ? 'このドローを保存' :
                 'Save This Reading'}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'zh' ? '问题（可选）' :
                     language === 'hi' ? 'प्रश्न (वैकल्पिक)' :
                     language === 'es' ? 'Pregunta (Opcional)' :
                     language === 'fr' ? 'Question (Optionnel)' :
                     language === 'ja' ? '質問（任意）' :
                     'Question (Optional)'}
                  </label>
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={language === 'zh' ? '你问的是什么问题？' :
                               language === 'hi' ? 'आपने क्या सवाल पूछा था?' :
                               language === 'es' ? '¿Qué pregunta hiciste?' :
                               language === 'fr' ? 'Quelle question avez-vous posée?' :
                               language === 'ja' ? '何を質問しましたか？' :
                               'What question did you ask?'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'zh' ? '背景（可选）' :
                     language === 'hi' ? 'संदर्भ (वैकल्पिक)' :
                     language === 'es' ? 'Contexto (Opcional)' :
                     language === 'fr' ? 'Contexte (Optionnel)' :
                     language === 'ja' ? '背景（任意）' :
                     'Context (Optional)'}
                  </label>
                  <textarea
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={language === 'zh' ? '描述一下你当前的情况或背景...' :
                               language === 'hi' ? 'अपनी वर्तमान स्थिति या पृष्ठभूमि का वर्णन करें...' :
                               language === 'es' ? 'Describe tu situación actual o contexto...' :
                               language === 'fr' ? 'Décrivez votre situation actuelle ou contexte...' :
                               language === 'ja' ? '現在の状況や背景を説明してください...' :
                               'Describe your current situation or context...'}
                  />
                </div>
                <button
                  onClick={saveReading}
                  disabled={isSavingReading}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  <span>
                    {isSavingReading ? 
                      (language === 'zh' ? '保存中...' : language === 'hi' ? 'सेव हो रहा है...' : language === 'es' ? 'Guardando...' : language === 'fr' ? 'Sauvegarde...' : language === 'ja' ? '保存中...' : 'Saving...') :
                      (language === 'zh' ? '保存抽取' : language === 'hi' ? 'ड्रॉ सेव करें' : language === 'es' ? 'Guardar Sorteo' : language === 'fr' ? 'Sauvegarder Tirage' : language === 'ja' ? 'ドローを保存' : 'Save Reading')
                    }
                  </span>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {language === 'zh' ? '接下来做什么？' :
                 language === 'hi' ? 'आगे क्या करना है?' :
                 language === 'es' ? '¿Qué te gustaría hacer a continuación?' :
                 language === 'fr' ? 'Que souhaitez-vous faire ensuite ?' :
                 language === 'ja' ? '次に何をしますか？' :
                 'What would you like to do next?'}
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <button
                  onClick={drawHexagram}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Shuffle className="w-5 h-5" />
                  <span>
                    {language === 'zh' ? '再次抽取' :
                     language === 'hi' ? 'फिर से ड्रॉ करें' :
                     language === 'es' ? 'Dibujar Otro' :
                     language === 'fr' ? 'Tirer un Autre' :
                     language === 'ja' ? 'もう一度引く' :
                     'Draw Another'}
                  </span>
                </button>
                <Link
                  href={`/hexagrams/${drawnHexagram.number}`}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>
                    {language === 'zh' ? '查看详情' :
                     language === 'hi' ? 'विवरण देखें' :
                     language === 'es' ? 'Ver Detalles' :
                     language === 'fr' ? 'Voir Détails' :
                     language === 'ja' ? '詳細を見る' :
                     'View Details'}
                  </span>
                </Link>
                <Link
                  href="/hexagrams"
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>
                    {language === 'zh' ? '浏览全部' :
                     language === 'hi' ? 'सभी ब्राउज़ करें' :
                     language === 'es' ? 'Explorar Todos' :
                     language === 'fr' ? 'Explorer Tous' :
                     language === 'ja' ? 'すべてを閲覧' :
                     'Browse All'}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Instructions */}
        {!drawnHexagram && !isDrawing && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {language === 'zh' ? '如何使用易经随机抽取' :
               language === 'hi' ? 'आई चिंग रैंडम ड्रॉ का उपयोग कैसे करें' :
               language === 'es' ? 'Cómo Usar el Sorteo Aleatorio del I Ching' :
               language === 'fr' ? 'Comment Utiliser le Tirage Aléatoire du I Ching' :
               language === 'ja' ? '易経ランダムドローの使い方' :
               'How to Use I Ching Random Draw'}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-semibold text-sm">1</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {language === 'zh' ? '静心思考' :
                       language === 'hi' ? 'शांत होकर सोचें' :
                       language === 'es' ? 'Centrarse y Pensar' :
                       language === 'fr' ? 'Se Centrer et Réfléchir' :
                       language === 'ja' ? '心を落ち着けて考える' :
                       'Center and Think'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {language === 'zh' ? '花点时间静心，思考你心中的问题或想要指导的方面。让心灵平静下来，为接受智慧做好准备。' :
                       language === 'hi' ? 'शांत होने के लिए समय लें, अपने दिल में प्रश्न या मार्गदर्शन चाहने वाले पहलू पर विचार करें। मन को शांत करें और ज्ञान प्राप्त करने के लिए तैयार हों।' :
                       language === 'es' ? 'Tómate tiempo para centrarte, considera la pregunta en tu corazón o el aspecto en el que buscas orientación. Calma tu mente y prepárate para recibir sabiduría.' :
                       language === 'fr' ? 'Prenez le temps de vous centrer, considérez la question dans votre cœur ou l\'aspect sur lequel vous cherchez des conseils. Calmez votre esprit et préparez-vous à recevoir la sagesse.' :
                       language === 'ja' ? '心を落ち着ける時間を取り、心の中の質問や指導を求めている側面を考えてください。心を静めて、知恵を受け取る準備をしてください。' :
                       'Take time to center yourself, consider the question in your heart or the aspect you seek guidance on. Calm your mind and prepare to receive wisdom.'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-semibold text-sm">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {language === 'zh' ? '点击抽取' :
                       language === 'hi' ? 'ड्रॉ के लिए क्लिक करें' :
                       language === 'es' ? 'Hacer Clic para Dibujar' :
                       language === 'fr' ? 'Cliquer pour Tirer' :
                       language === 'ja' ? 'クリックしてドロー' :
                       'Click to Draw'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {language === 'zh' ? '准备好后，点击抽取按钮，让易经为你选择最合适的卦象。相信宇宙会为你提供最需要的指导。' :
                       language === 'hi' ? 'तैयार होने पर, ड्रॉ बटन पर क्लिक करें और आई चिंग को आपके लिए सबसे उपयुक्त हेक्साग्राम चुनने दें। ब्रह्मांड पर भरोसा करें कि वह आपको सबसे जरूरी मार्गदर्शन प्रदान करेगा।' :
                       language === 'es' ? 'Cuando estés listo, haz clic en el botón de dibujar y deja que el I Ching seleccione el hexagrama más apropiado para ti. Confía en que el universo te proporcionará la guía que más necesitas.' :
                       language === 'fr' ? 'Quand vous êtes prêt, cliquez sur le bouton de tirage et laissez le I Ching sélectionner l\'hexagramme le plus approprié pour vous. Faites confiance à l\'univers pour vous fournir les conseils dont vous avez le plus besoin.' :
                       language === 'ja' ? '準備ができたら、ドローボタンをクリックして、易経にあなたに最も適した卦を選ばせてください。宇宙があなたに最も必要な指導を提供してくれることを信じてください。' :
                       'When ready, click the draw button and let the I Ching select the most appropriate hexagram for you. Trust that the universe will provide you with the guidance you most need.'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-semibold text-sm">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {language === 'zh' ? '深入理解' :
                       language === 'hi' ? 'गहराई से समझें' :
                       language === 'es' ? 'Entender Profundamente' :
                       language === 'fr' ? 'Comprendre en Profondeur' :
                       language === 'ja' ? '深く理解する' :
                       'Understand Deeply'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {language === 'zh' ? '仔细阅读卦象的含义，聆听音频解读，并思考如何应用到你的生活中。让智慧渗透你的意识。' :
                       language === 'hi' ? 'हेक्साग्राम के अर्थ को ध्यान से पढ़ें, ऑडियो व्याख्या सुनें और इसे अपने जीवन में कैसे लागू करें इस पर विचार करें। ज्ञान को अपनी चेतना में प्रवेश करने दें।' :
                       language === 'es' ? 'Lee cuidadosamente el significado del hexagrama, escucha la interpretación de audio y considera cómo aplicarlo a tu vida. Permite que la sabiduría penetre tu conciencia.' :
                       language === 'fr' ? 'Lisez attentivement la signification de l\'hexagramme, écoutez l\'interprétation audio et considérez comment l\'appliquer à votre vie. Permettez à la sagesse de pénétrer votre conscience.' :
                       language === 'ja' ? '卦の意味を注意深く読み、音声解釈を聞き、それをあなたの人生にどのように適用するかを考えてください。知恵があなたの意識に浸透することを許してください。' :
                       'Read carefully the meaning of the hexagram, listen to the audio interpretation, and consider how to apply it to your life. Allow wisdom to penetrate your consciousness.'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-semibold text-sm">4</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {language === 'zh' ? '采取行动' :
                       language === 'hi' ? 'कार्य करें' :
                       language === 'es' ? 'Tomar Acción' :
                       language === 'fr' ? 'Prendre Action' :
                       language === 'ja' ? '行動を起こす' :
                       'Take Action'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {language === 'zh' ? '根据卦象的指导，考虑采取什么行动或改变，让智慧指导你的决定。记住，易经提供的是智慧，不是僵化的规则。' :
                       language === 'hi' ? 'हेक्साग्राम के मार्गदर्शन के आधार पर, कौन से कार्य या परिवर्तन करने हैं इस पर विचार करें और ज्ञान को अपने निर्णयों का मार्गदर्शन करने दें। याद रखें कि आई चिंग ज्ञान प्रदान करता है, कठोर नियम नहीं।' :
                       language === 'es' ? 'Basándote en la guía del hexagrama, considera qué acciones o cambios tomar y deja que la sabiduría guíe tus decisiones. Recuerda que el I Ching ofrece sabiduría, no reglas rígidas.' :
                       language === 'fr' ? 'Basé sur la guidance de l\'hexagramme, considérez quelles actions ou changements prendre et laissez la sagesse guider vos décisions. Rappelez-vous que le I Ching offre de la sagesse, pas des règles rigides.' :
                       language === 'ja' ? '卦の指導に基づいて、どのような行動や変化を取るかを考え、知恵があなたの決定を導くようにしてください。易経は知恵を提供しますが、厳格なルールではありません。' :
                       'Based on the hexagram\'s guidance, consider what actions or changes to take and let wisdom guide your decisions. Remember that the I Ching offers wisdom, not rigid rules.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}