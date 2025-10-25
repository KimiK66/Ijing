'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Shuffle, ArrowLeft, BookOpen, Volume2, Lightbulb, Clock, Target, Heart, Star, Zap, Info } from 'lucide-react'
import { HexagramDisplay } from '@/components/HexagramDisplay'
import { AudioPlayer } from '@/components/AudioPlayer'
import { LanguageSelector } from '@/components/LanguageSelector'
import { useApp } from '@/app/providers'
import { HexagramTranslation } from '@/types'
import { getLocalizedText } from '@/lib/hexagrams'
import hexagramsData from '@/data/all-64-enhanced-hexagrams.json'

export default function DrawPage() {
  const { language } = useApp()
  const [hexagrams, setHexagrams] = useState<HexagramTranslation[]>([])
  const [drawnHexagram, setDrawnHexagram] = useState<HexagramTranslation | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [drawHistory, setDrawHistory] = useState<HexagramTranslation[]>([])
  const [showDetailedInterpretation, setShowDetailedInterpretation] = useState(false)

  // Load hexagrams data
  useEffect(() => {
    const loadHexagrams = async () => {
      try {
        // Use the imported hexagrams data directly
        setHexagrams(hexagramsData as HexagramTranslation[])
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
    const guidance = {
      en: {
        timing: "This hexagram represents the current moment in your life's journey. The timing suggests that the energies and circumstances are aligned for this particular guidance to be most relevant to your situation. Consider how this moment in time relates to your current challenges, opportunities, and the natural flow of change in your life.",
        application: "Consider how the themes of this hexagram apply to your current challenges or opportunities. Reflect on the symbolic meaning and how it might guide your decisions and actions. This hexagram speaks to the deeper patterns of your life and offers wisdom for navigating your current circumstances with grace and understanding.",
        reflection: "Take time to meditate on this hexagram's message. The I Ching speaks to the deeper patterns of change and transformation in your life. This is an opportunity for deep self-reflection and understanding of the cosmic forces at work in your personal journey. Allow the wisdom to penetrate your consciousness and guide your inner knowing.",
        action: "Based on this hexagram's guidance, consider what actions or changes might be beneficial. Remember that the I Ching offers wisdom, not rigid prescriptions. The guidance is meant to inspire thoughtful action rather than impulsive decisions. Consider both immediate steps and long-term directions that align with the hexagram's wisdom."
      },
      zh: {
        timing: "这个卦象代表你人生旅程中的当前时刻。时机表明能量和环境已经对齐，这个特定的指导对你的情况最为相关。考虑这个时刻如何与你当前的挑战、机遇以及生活中变化的自然流动相关。",
        application: "考虑这个卦象的主题如何适用于你当前的挑战或机遇。反思象征意义以及它如何指导你的决定和行动。这个卦象与你生活的更深层模式对话，并为优雅和理解地驾驭你当前的环境提供智慧。",
        reflection: "花时间冥想这个卦象的信息。易经与你生活中变化和转化的更深层模式对话。这是深度自我反思和理解宇宙力量在你个人旅程中发挥作用的机会。让智慧渗透你的意识并指导你的内在认知。",
        action: "基于这个卦象的指导，考虑什么行动或变化可能有益。记住易经提供智慧，而不是僵化的处方。指导旨在激发深思熟虑的行动，而不是冲动的决定。考虑与卦象智慧一致的即时步骤和长期方向。"
      },
      hi: {
        timing: "यह हेक्साग्राम आपके जीवन की यात्रा में वर्तमान क्षण का प्रतिनिधित्व करता है। समय बताता है कि ऊर्जाएं और परिस्थितियां इस विशेष मार्गदर्शन के लिए संरेखित हैं। विचार करें कि यह समय आपकी वर्तमान चुनौतियों, अवसरों और आपके जीवन में परिवर्तन के प्राकृतिक प्रवाह से कैसे संबंधित है।",
        application: "विचार करें कि यह हेक्साग्राम के विषय आपकी वर्तमान चुनौतियों या अवसरों पर कैसे लागू होते हैं। प्रतीकात्मक अर्थ पर विचार करें और यह आपके निर्णयों और कार्यों का मार्गदर्शन कैसे कर सकता है। यह हेक्साग्राम आपके जीवन के गहरे पैटर्न से बात करता है।",
        reflection: "इस हेक्साग्राम के संदेश पर ध्यान करने का समय लें। आई चिंग आपके जीवन में परिवर्तन और रूपांतरण के गहरे पैटर्न से बात करता है। यह गहरे आत्म-चिंतन और आपकी व्यक्तिगत यात्रा में काम कर रही ब्रह्मांडीय शक्तियों की समझ का अवसर है।",
        action: "इस हेक्साग्राम के मार्गदर्शन के आधार पर, विचार करें कि कौन से कार्य या परिवर्तन लाभकारी हो सकते हैं। याद रखें कि आई चिंग ज्ञान प्रदान करता है, कठोर नुस्खे नहीं। मार्गदर्शन आवेगी निर्णयों के बजाय विचारशील कार्य को प्रेरित करने के लिए है।"
      },
      es: {
        timing: "Este hexagrama representa el momento actual en el viaje de tu vida. El momento sugiere que las energías y circunstancias están alineadas para que esta guía particular sea más relevante para tu situación. Considera cómo este momento en el tiempo se relaciona con tus desafíos actuales, oportunidades y el flujo natural de cambio en tu vida.",
        application: "Considera cómo los temas de este hexagrama se aplican a tus desafíos o oportunidades actuales. Reflexiona sobre el significado simbólico y cómo podría guiar tus decisiones y acciones. Este hexagrama habla de los patrones más profundos de tu vida y ofrece sabiduría para navegar tus circunstancias actuales con gracia y comprensión.",
        reflection: "Tómate tiempo para meditar en el mensaje de este hexagrama. El I Ching habla de los patrones más profundos de cambio y transformación en tu vida. Esta es una oportunidad para la reflexión profunda y la comprensión de las fuerzas cósmicas en trabajo en tu viaje personal. Permite que la sabiduría penetre tu conciencia y guíe tu conocimiento interior.",
        action: "Basándote en la guía de este hexagrama, considera qué acciones o cambios podrían ser beneficiosos. Recuerda que el I Ching ofrece sabiduría, no prescripciones rígidas. La guía está destinada a inspirar acción reflexiva en lugar de decisiones impulsivas. Considera tanto pasos inmediatos como direcciones a largo plazo que se alineen con la sabiduría del hexagrama."
      },
      fr: {
        timing: "Ce hexagramme représente le moment présent dans le voyage de votre vie. Le timing suggère que les énergies et les circonstances sont alignées pour que cette guidance particulière soit la plus pertinente pour votre situation. Considérez comment ce moment dans le temps se rapporte à vos défis actuels, opportunités et le flux naturel de changement dans votre vie.",
        application: "Considérez comment les thèmes de ce hexagramme s'appliquent à vos défis ou opportunités actuels. Réfléchissez au sens symbolique et à la façon dont il pourrait guider vos décisions et actions. Ce hexagramme parle des modèles plus profonds de votre vie et offre de la sagesse pour naviguer vos circonstances actuelles avec grâce et compréhension.",
        reflection: "Prenez le temps de méditer sur le message de ce hexagramme. Le I Ching parle des modèles plus profonds de changement et de transformation dans votre vie. C'est une opportunité pour la réflexion profonde et la compréhension des forces cosmiques en travail dans votre voyage personnel. Permettez à la sagesse de pénétrer votre conscience et de guider votre connaissance intérieure.",
        action: "Basé sur la guidance de ce hexagramme, considérez quelles actions ou changements pourraient être bénéfiques. Rappelez-vous que le I Ching offre de la sagesse, pas des prescriptions rigides. La guidance est destinée à inspirer une action réfléchie plutôt que des décisions impulsives. Considérez à la fois des étapes immédiates et des directions à long terme qui s'alignent avec la sagesse du hexagramme."
      },
      ja: {
        timing: "この六十四卦はあなたの人生の旅路における現在の瞬間を表しています。タイミングは、エネルギーと状況が整い、この特定の指導があなたの状況に最も関連性があることを示しています。この時点があなたの現在の課題、機会、そして人生における変化の自然な流れとどのように関連するかを考えてください。",
        application: "この六十四卦のテーマがあなたの現在の課題や機会にどのように適用されるかを考えてください。象徴的な意味とそれがあなたの決定や行動をどのように導くかを反省してください。この六十四卦はあなたの人生のより深いパターンについて語り、現在の状況を優雅さと理解を持ってナビゲートするための知恵を提供します。",
        reflection: "この六十四卦のメッセージについて瞑想する時間を取ってください。易経はあなたの人生における変化と変容のより深いパターンについて語ります。これは深い自己反省とあなたの個人的な旅路で働いている宇宙の力の理解の機会です。知恵があなたの意識に浸透し、あなたの内なる知識を導くことを許してください。",
        action: "この六十四卦の指導に基づいて、どのような行動や変化が有益であるかを考えてください。易経は知恵を提供しますが、厳格な処方箋ではありません。指導は衝動的な決定ではなく、思慮深い行動を促すことを目的としています。六十四卦の知恵と一致する即座のステップと長期的な方向の両方を考慮してください。"
      }
    }
    
    return guidance[language] || guidance.en
  }

  const getPersonalInsights = (hexagram: HexagramTranslation) => {
    const insights = {
      en: {
        lifeArea: "This hexagram particularly relates to your personal development and inner growth. It speaks to the fundamental aspects of your character and the way you approach life's challenges and opportunities.",
        emotionalGuidance: "Emotionally, this hexagram suggests a time of balance and harmony, or perhaps a need to find balance in your emotional responses. It encourages you to trust your feelings while also maintaining perspective.",
        practicalAdvice: "In practical terms, this hexagram advises patience and careful consideration before taking action. It suggests that the timing is important and that rushing into decisions may not serve your highest good.",
        spiritualMessage: "Spiritually, this hexagram speaks to your connection with the divine and the natural order of things. It reminds you that you are part of a larger cosmic pattern and that your individual journey has meaning within this greater context."
      },
      zh: {
        lifeArea: "这个卦象特别与你的个人发展和内在成长相关。它与你性格的基本方面以及你应对生活挑战和机遇的方式对话。",
        emotionalGuidance: "在情感上，这个卦象暗示着平衡与和谐的时期，或者也许需要在你的情感反应中找到平衡。它鼓励你信任自己的感受，同时保持视角。",
        practicalAdvice: "在实际方面，这个卦象建议在采取行动之前要有耐心和仔细考虑。它暗示时机很重要，匆忙做决定可能不会为你带来最大的好处。",
        spiritualMessage: "在精神上，这个卦象与你与神圣和事物自然秩序的联系对话。它提醒你，你是更大宇宙模式的一部分，你的个人旅程在这个更大的背景中有意义。"
      },
      hi: {
        lifeArea: "यह हेक्साग्राम विशेष रूप से आपके व्यक्तिगत विकास और आंतरिक विकास से संबंधित है। यह आपके चरित्र के मौलिक पहलुओं और जीवन की चुनौतियों और अवसरों से निपटने के तरीके से बात करता है।",
        emotionalGuidance: "भावनात्मक रूप से, यह हेक्साग्राम संतुलन और सामंजस्य के समय का सुझाव देता है, या शायद आपकी भावनात्मक प्रतिक्रियाओं में संतुलन खोजने की आवश्यकता है।",
        practicalAdvice: "व्यावहारिक रूप से, यह हेक्साग्राम कार्य करने से पहले धैर्य और सावधानीपूर्वक विचार की सलाह देता है। यह सुझाव देता है कि समय महत्वपूर्ण है।",
        spiritualMessage: "आध्यात्मिक रूप से, यह हेक्साग्राम आपके दिव्य और चीजों के प्राकृतिक क्रम के साथ संबंध से बात करता है।"
      },
      es: {
        lifeArea: "Este hexagrama se relaciona particularmente con tu desarrollo personal y crecimiento interior. Habla de los aspectos fundamentales de tu carácter y la forma en que abordas los desafíos y oportunidades de la vida.",
        emotionalGuidance: "Emocionalmente, este hexagrama sugiere un tiempo de equilibrio y armonía, o tal vez una necesidad de encontrar equilibrio en tus respuestas emocionales. Te anima a confiar en tus sentimientos mientras mantienes perspectiva.",
        practicalAdvice: "En términos prácticos, este hexagrama aconseja paciencia y consideración cuidadosa antes de tomar acción. Sugiere que el timing es importante y que apresurarse en decisiones puede no servir a tu mayor bien.",
        spiritualMessage: "Espiritualmente, este hexagrama habla de tu conexión con lo divino y el orden natural de las cosas. Te recuerda que eres parte de un patrón cósmico más grande y que tu viaje individual tiene significado dentro de este contexto mayor."
      },
      fr: {
        lifeArea: "Ce hexagramme se rapporte particulièrement à votre développement personnel et croissance intérieure. Il parle des aspects fondamentaux de votre caractère et de la façon dont vous abordez les défis et opportunités de la vie.",
        emotionalGuidance: "Émotionnellement, ce hexagramme suggère un temps d'équilibre et d'harmonie, ou peut-être un besoin de trouver l'équilibre dans vos réponses émotionnelles. Il vous encourage à faire confiance à vos sentiments tout en maintenant la perspective.",
        practicalAdvice: "En termes pratiques, ce hexagramme conseille la patience et la considération soigneuse avant d'agir. Il suggère que le timing est important et que se précipiter dans les décisions peut ne pas servir votre plus grand bien.",
        spiritualMessage: "Spirituellement, ce hexagramme parle de votre connexion avec le divin et l'ordre naturel des choses. Il vous rappelle que vous faites partie d'un modèle cosmique plus grand et que votre voyage individuel a du sens dans ce contexte plus large."
      },
      ja: {
        lifeArea: "この六十四卦は特にあなたの個人的な発達と内なる成長に関連しています。それはあなたの性格の基本的な側面と、人生の課題や機会にアプローチする方法について語ります。",
        emotionalGuidance: "感情的には、この六十四卦はバランスと調和の時、またはあなたの感情的反応にバランスを見つける必要性を示唆しています。視点を保ちながら感情を信頼することを奨励します。",
        practicalAdvice: "実用的には、この六十四卦は行動を起こす前に忍耐と慎重な考慮を勧めます。タイミングが重要であり、決定に急ぐことはあなたの最高の善に役立たないかもしれないことを示唆しています。",
        spiritualMessage: "精神的には、この六十四卦はあなたの神聖なものとのつながりと物事の自然な秩序について語ります。あなたがより大きな宇宙のパターンの一部であり、あなたの個人的な旅路がこのより大きな文脈の中で意味を持つことを思い出させます。"
      }
    }
    
    return insights[language] || insights.en
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
                      <p className="text-gray-700 leading-relaxed">{value}</p>
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
                    <p className="text-gray-700 text-sm leading-relaxed">{value}</p>
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