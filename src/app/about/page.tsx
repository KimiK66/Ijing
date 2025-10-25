'use client'

import Link from 'next/link'
import { ArrowLeft, BookOpen, Shuffle, Info, Clock, Target, Heart, Lightbulb, Star, Zap, Globe, Users, Brain, Compass } from 'lucide-react'
import { useApp } from '@/app/providers'

export default function AboutPage() {
  const { language } = useApp()

  const content = {
    en: {
      title: "What is the I Ching?",
      subtitle: "Ancient Wisdom for Modern Life",
      hero: "Discover the profound teachings of the I Ching, the ancient Book of Changes that has guided humanity for over 3,000 years.",
      
      whatIs: {
        title: "What is the I Ching?",
        content: "The I Ching, or Book of Changes, is one of the oldest and most revered texts in Chinese philosophy. It's a system of divination and wisdom that helps us understand the patterns of change in our lives and the universe. Through 64 symbolic hexagrams, it offers guidance for decision-making, personal growth, and understanding life's complexities."
      },
      
      history: {
        title: "History & Origins",
        content: "The I Ching originated in ancient China over 3,000 years ago. Originally used for divination by ancient Chinese rulers and scholars, it evolved into a comprehensive philosophical system. Confucius himself studied and commented on the I Ching, and it became one of the Five Classics of Chinese literature. Today, it continues to influence philosophy, psychology, and decision-making worldwide."
      },
      
      philosophy: {
        title: "Core Philosophy",
        content: "The I Ching is built on the fundamental principles of Yin and Yang - the complementary forces that create all existence. It teaches that change is the only constant, and by understanding these patterns of change, we can navigate life with wisdom and grace. The philosophy emphasizes balance, harmony, and the natural flow of cosmic energy."
      },
      
      hexagrams: {
        title: "The 64 Hexagrams",
        content: "The I Ching consists of 64 hexagrams, each composed of six lines (either solid or broken). These hexagrams represent different life situations, challenges, and opportunities. Each hexagram has a specific meaning, interpretation, and guidance for various aspects of life. The system is based on eight trigrams that combine to form these 64 unique patterns."
      },
      
      howToUse: {
        title: "How to Use the I Ching",
        content: "Using the I Ching is simple yet profound. First, formulate a clear question or intention. Then, either draw a random hexagram or consult a specific one that resonates with your situation. Read the interpretation carefully, reflect on how it applies to your life, and consider the guidance it offers. The I Ching provides wisdom, not rigid answers - it's up to you to apply the insights to your unique circumstances."
      },
      
      benefits: {
        title: "Benefits & Applications",
        content: "The I Ching offers numerous benefits for modern life: enhanced decision-making through ancient wisdom, deeper self-reflection and personal growth, guidance during difficult times, improved understanding of life's patterns, and spiritual development. It's particularly valuable for career decisions, relationship guidance, personal challenges, and understanding life transitions."
      },
      
      gettingStarted: {
        title: "Getting Started",
        content: "Ready to explore the wisdom of the I Ching? Start with a random draw to receive guidance for your current situation, or browse through all 64 hexagrams to learn about different life patterns. Each reading is a conversation with ancient wisdom that can illuminate your path forward."
      }
    },
    
    zh: {
      title: "什么是易经？",
      subtitle: "古代智慧，现代生活",
      hero: "探索易经的深刻教义，这本古老的《易经》已经指导人类超过3000年。",
      
      whatIs: {
        title: "什么是易经？",
        content: "易经，或称《易经》，是中国哲学中最古老、最受尊敬的文本之一。它是一个占卜和智慧系统，帮助我们理解生活和宇宙中变化的模式。通过64个象征性的卦象，它为决策制定、个人成长和理解生活的复杂性提供指导。"
      },
      
      history: {
        title: "历史与起源",
        content: "易经起源于3000多年前的古代中国。最初被古代中国统治者和学者用于占卜，后来发展成为一个综合的哲学体系。孔子本人研究并注释了易经，它成为中国文学五经之一。今天，它继续影响着全世界的哲学、心理学和决策制定。"
      },
      
      philosophy: {
        title: "核心哲学",
        content: "易经建立在阴阳的基本原则上——创造所有存在的互补力量。它教导变化是唯一不变的，通过理解这些变化模式，我们可以用智慧和优雅来驾驭生活。哲学强调平衡、和谐和宇宙能量的自然流动。"
      },
      
      hexagrams: {
        title: "六十四卦",
        content: "易经由64个卦组成，每个卦由六条线（实线或虚线）组成。这些卦代表不同的生活情况、挑战和机遇。每个卦都有特定的含义、解释和对生活各个方面的指导。该系统基于八个三爻卦，它们组合形成这64个独特的模式。"
      },
      
      howToUse: {
        title: "如何使用易经",
        content: "使用易经简单而深刻。首先，制定一个清晰的问题或意图。然后，要么抽取一个随机卦，要么咨询一个与你情况共鸣的特定卦。仔细阅读解释，反思它如何适用于你的生活，并考虑它提供的指导。易经提供智慧，而不是僵化的答案——由你来将这些洞察应用到你的独特情况中。"
      },
      
      benefits: {
        title: "益处与应用",
        content: "易经为现代生活提供众多益处：通过古代智慧增强决策能力，更深的自我反思和个人成长，困难时期的指导，改善对生活模式的理解，以及精神发展。它对于职业决策、关系指导、个人挑战和理解生活转变特别有价值。"
      },
      
      gettingStarted: {
        title: "开始使用",
        content: "准备好探索易经的智慧了吗？从随机抽取开始，为你当前的情况获得指导，或者浏览所有64个卦来了解不同的生活模式。每次阅读都是与古代智慧的对话，可以照亮你前进的道路。"
      }
    },
    
    hi: {
      title: "आई चिंग क्या है?",
      subtitle: "आधुनिक जीवन के लिए प्राचीन ज्ञान",
      hero: "आई चिंग के गहन शिक्षाओं की खोज करें, प्राचीन परिवर्तन की पुस्तक जो 3000 से अधिक वर्षों से मानवता का मार्गदर्शन कर रही है।",
      
      whatIs: {
        title: "आई चिंग क्या है?",
        content: "आई चिंग, या परिवर्तन की पुस्तक, चीनी दर्शन में सबसे पुराने और सबसे सम्मानित ग्रंथों में से एक है। यह एक भविष्यवाणी और ज्ञान की प्रणाली है जो हमें अपने जीवन और ब्रह्मांड में परिवर्तन के पैटर्न को समझने में मदद करती है। 64 प्रतीकात्मक हेक्साग्राम के माध्यम से, यह निर्णय लेने, व्यक्तिगत विकास और जीवन की जटिलताओं को समझने के लिए मार्गदर्शन प्रदान करता है।"
      },
      
      history: {
        title: "इतिहास और उत्पत्ति",
        content: "आई चिंग की उत्पत्ति 3000 से अधिक वर्ष पहले प्राचीन चीन में हुई थी। मूल रूप से प्राचीन चीनी शासकों और विद्वानों द्वारा भविष्यवाणी के लिए उपयोग किया जाता था, यह एक व्यापक दार्शनिक प्रणाली में विकसित हुआ। कन्फ्यूशियस ने स्वयं आई चिंग का अध्ययन किया और इस पर टिप्पणी की, और यह चीनी साहित्य के पांच क्लासिक्स में से एक बन गया। आज, यह दुनिया भर में दर्शन, मनोविज्ञान और निर्णय लेने को प्रभावित करना जारी रखता है।"
      },
      
      philosophy: {
        title: "मूल दर्शन",
        content: "आई चिंग यिन और यांग के मौलिक सिद्धांतों पर बनाया गया है - पूरक बल जो सभी अस्तित्व को बनाते हैं। यह सिखाता है कि परिवर्तन एकमात्र स्थिर है, और परिवर्तन के इन पैटर्न को समझकर, हम ज्ञान और अनुग्रह के साथ जीवन का नेविगेट कर सकते हैं। दर्शन संतुलन, सामंजस्य और ब्रह्मांडीय ऊर्जा के प्राकृतिक प्रवाह पर जोर देता है।"
      },
      
      hexagrams: {
        title: "64 हेक्साग्राम",
        content: "आई चिंग में 64 हेक्साग्राम होते हैं, प्रत्येक छह रेखाओं (ठोस या टूटी हुई) से बना होता है। ये हेक्साग्राम विभिन्न जीवन स्थितियों, चुनौतियों और अवसरों का प्रतिनिधित्व करते हैं। प्रत्येक हेक्साग्राम का जीवन के विभिन्न पहलुओं के लिए एक विशिष्ट अर्थ, व्याख्या और मार्गदर्शन होता है। प्रणाली आठ ट्राइग्राम पर आधारित है जो इन 64 अद्वितीय पैटर्न को बनाने के लिए संयोजित होते हैं।"
      },
      
      howToUse: {
        title: "आई चिंग का उपयोग कैसे करें",
        content: "आई चिंग का उपयोग करना सरल लेकिन गहन है। पहले, एक स्पष्ट प्रश्न या इरादा तैयार करें। फिर, या तो एक यादृच्छिक हेक्साग्राम ड्रॉ करें या एक विशिष्ट हेक्साग्राम से परामर्श करें जो आपकी स्थिति के साथ प्रतिध्वनित होता है। व्याख्या को ध्यान से पढ़ें, इस पर विचार करें कि यह आपके जीवन पर कैसे लागू होता है, और इसे प्रदान किए गए मार्गदर्शन पर विचार करें। आई चिंग ज्ञान प्रदान करता है, कठोर उत्तर नहीं - यह आप पर निर्भर है कि आप अंतर्दृष्टि को अपनी अद्वितीय परिस्थितियों में लागू करें।"
      },
      
      benefits: {
        title: "लाभ और अनुप्रयोग",
        content: "आई चिंग आधुनिक जीवन के लिए कई लाभ प्रदान करता है: प्राचीन ज्ञान के माध्यम से बेहतर निर्णय लेने, गहरे आत्म-चिंतन और व्यक्तिगत विकास, कठिन समय के दौरान मार्गदर्शन, जीवन के पैटर्न की बेहतर समझ, और आध्यात्मिक विकास। यह विशेष रूप से करियर निर्णय, रिश्ते मार्गदर्शन, व्यक्तिगत चुनौतियों और जीवन संक्रमण को समझने के लिए मूल्यवान है।"
      },
      
      gettingStarted: {
        title: "शुरुआत करें",
        content: "आई चिंग के ज्ञान का पता लगाने के लिए तैयार हैं? अपनी वर्तमान स्थिति के लिए मार्गदर्शन प्राप्त करने के लिए एक यादृच्छिक ड्रॉ से शुरुआत करें, या विभिन्न जीवन पैटर्न के बारे में जानने के लिए सभी 64 हेक्साग्राम के माध्यम से ब्राउज़ करें। प्रत्येक पढ़ना प्राचीन ज्ञान के साथ एक बातचीत है जो आपके आगे के रास्ते को रोशन कर सकती है।"
      }
    },
    
    es: {
      title: "¿Qué es el I Ching?",
      subtitle: "Sabiduría Antigua para la Vida Moderna",
      hero: "Descubre las enseñanzas profundas del I Ching, el antiguo Libro de los Cambios que ha guiado a la humanidad por más de 3,000 años.",
      
      whatIs: {
        title: "¿Qué es el I Ching?",
        content: "El I Ching, o Libro de los Cambios, es uno de los textos más antiguos y venerados en la filosofía china. Es un sistema de adivinación y sabiduría que nos ayuda a entender los patrones de cambio en nuestras vidas y el universo. A través de 64 hexagramas simbólicos, ofrece orientación para la toma de decisiones, el crecimiento personal y la comprensión de las complejidades de la vida."
      },
      
      history: {
        title: "Historia y Orígenes",
        content: "El I Ching se originó en la antigua China hace más de 3,000 años. Originalmente usado para adivinación por gobernantes y eruditos chinos antiguos, evolucionó hasta convertirse en un sistema filosófico integral. El propio Confucio estudió y comentó sobre el I Ching, y se convirtió en uno de los Cinco Clásicos de la literatura china. Hoy en día, continúa influyendo en la filosofía, psicología y toma de decisiones en todo el mundo."
      },
      
      philosophy: {
        title: "Filosofía Central",
        content: "El I Ching está construido sobre los principios fundamentales del Yin y Yang - las fuerzas complementarias que crean toda la existencia. Enseña que el cambio es la única constante, y al entender estos patrones de cambio, podemos navegar la vida con sabiduría y gracia. La filosofía enfatiza el equilibrio, la armonía y el flujo natural de la energía cósmica."
      },
      
      hexagrams: {
        title: "Los 64 Hexagramas",
        content: "El I Ching consiste en 64 hexagramas, cada uno compuesto de seis líneas (sólidas o rotas). Estos hexagramas representan diferentes situaciones de vida, desafíos y oportunidades. Cada hexagrama tiene un significado específico, interpretación y orientación para varios aspectos de la vida. El sistema se basa en ocho trigramas que se combinan para formar estos 64 patrones únicos."
      },
      
      howToUse: {
        title: "Cómo Usar el I Ching",
        content: "Usar el I Ching es simple pero profundo. Primero, formula una pregunta clara o intención. Luego, ya sea dibuja un hexagrama aleatorio o consulta uno específico que resuene con tu situación. Lee la interpretación cuidadosamente, reflexiona sobre cómo se aplica a tu vida, y considera la orientación que ofrece. El I Ching proporciona sabiduría, no respuestas rígidas - depende de ti aplicar las percepciones a tus circunstancias únicas."
      },
      
      benefits: {
        title: "Beneficios y Aplicaciones",
        content: "El I Ching ofrece numerosos beneficios para la vida moderna: toma de decisiones mejorada a través de sabiduría antigua, autorreflexión más profunda y crecimiento personal, orientación durante tiempos difíciles, mejor comprensión de los patrones de vida, y desarrollo espiritual. Es particularmente valioso para decisiones de carrera, orientación en relaciones, desafíos personales y comprensión de transiciones de vida."
      },
      
      gettingStarted: {
        title: "Comenzar",
        content: "¿Listo para explorar la sabiduría del I Ching? Comienza con un sorteo aleatorio para recibir orientación para tu situación actual, o navega a través de los 64 hexagramas para aprender sobre diferentes patrones de vida. Cada lectura es una conversación con sabiduría antigua que puede iluminar tu camino hacia adelante."
      }
    },
    
    fr: {
      title: "Qu'est-ce que le I Ching ?",
      subtitle: "Sagesse Ancienne pour la Vie Moderne",
      hero: "Découvrez les enseignements profonds du I Ching, l'ancien Livre des Changements qui guide l'humanité depuis plus de 3 000 ans.",
      
      whatIs: {
        title: "Qu'est-ce que le I Ching ?",
        content: "Le I Ching, ou Livre des Changements, est l'un des textes les plus anciens et les plus vénérés de la philosophie chinoise. C'est un système de divination et de sagesse qui nous aide à comprendre les modèles de changement dans nos vies et l'univers. À travers 64 hexagrammes symboliques, il offre des conseils pour la prise de décision, la croissance personnelle et la compréhension des complexités de la vie."
      },
      
      history: {
        title: "Histoire et Origines",
        content: "Le I Ching est originaire de la Chine ancienne il y a plus de 3 000 ans. Initialement utilisé pour la divination par les dirigeants et érudits chinois anciens, il a évolué en un système philosophique complet. Confucius lui-même a étudié et commenté le I Ching, et il est devenu l'un des Cinq Classiques de la littérature chinoise. Aujourd'hui, il continue d'influencer la philosophie, la psychologie et la prise de décision dans le monde entier."
      },
      
      philosophy: {
        title: "Philosophie Centrale",
        content: "Le I Ching est construit sur les principes fondamentaux du Yin et Yang - les forces complémentaires qui créent toute existence. Il enseigne que le changement est la seule constante, et en comprenant ces modèles de changement, nous pouvons naviguer dans la vie avec sagesse et grâce. La philosophie met l'accent sur l'équilibre, l'harmonie et le flux naturel de l'énergie cosmique."
      },
      
      hexagrams: {
        title: "Les 64 Hexagrammes",
        content: "Le I Ching consiste en 64 hexagrammes, chacun composé de six lignes (solides ou brisées). Ces hexagrammes représentent différentes situations de vie, défis et opportunités. Chaque hexagramme a une signification spécifique, une interprétation et des conseils pour divers aspects de la vie. Le système est basé sur huit trigrammes qui se combinent pour former ces 64 modèles uniques."
      },
      
      howToUse: {
        title: "Comment Utiliser le I Ching",
        content: "Utiliser le I Ching est simple mais profond. D'abord, formulez une question claire ou une intention. Ensuite, soit tirez un hexagramme aléatoire ou consultez-en un spécifique qui résonne avec votre situation. Lisez l'interprétation attentivement, réfléchissez à la façon dont elle s'applique à votre vie, et considérez les conseils qu'elle offre. Le I Ching fournit de la sagesse, pas des réponses rigides - c'est à vous d'appliquer les insights à vos circonstances uniques."
      },
      
      benefits: {
        title: "Bénéfices et Applications",
        content: "Le I Ching offre de nombreux bénéfices pour la vie moderne : prise de décision améliorée grâce à la sagesse ancienne, auto-réflexion plus profonde et croissance personnelle, conseils pendant les moments difficiles, meilleure compréhension des modèles de vie, et développement spirituel. Il est particulièrement précieux pour les décisions de carrière, les conseils relationnels, les défis personnels et la compréhension des transitions de vie."
      },
      
      gettingStarted: {
        title: "Commencer",
        content: "Prêt à explorer la sagesse du I Ching ? Commencez par un tirage aléatoire pour recevoir des conseils pour votre situation actuelle, ou parcourez les 64 hexagrammes pour apprendre sur différents modèles de vie. Chaque lecture est une conversation avec la sagesse ancienne qui peut éclairer votre chemin vers l'avant."
      }
    },
    
    ja: {
      title: "易経とは？",
      subtitle: "現代生活のための古代の知恵",
      hero: "3000年以上にわたって人類を導いてきた古代の変化の書、易経の深遠な教えを発見してください。",
      
      whatIs: {
        title: "易経とは？",
        content: "易経、または変化の書は、中国哲学で最も古く、最も尊敬されるテキストの一つです。それは、私たちの生活と宇宙における変化のパターンを理解するのに役立つ占いと知恵のシステムです。64の象徴的な六十四卦を通じて、意思決定、個人的成長、そして人生の複雑さの理解のための指導を提供します。"
      },
      
      history: {
        title: "歴史と起源",
        content: "易経は3000年以上前に古代中国で生まれました。元々は古代中国の統治者や学者によって占いのために使用されていましたが、包括的な哲学システムに発展しました。孔子自身が易経を研究し、それについてコメントし、それは中国文学の五経の一つになりました。今日、それは世界中の哲学、心理学、意思決定に影響を与え続けています。"
      },
      
      philosophy: {
        title: "核心哲学",
        content: "易経は陰と陽の基本原理に基づいて構築されています - すべての存在を創造する相補的な力です。変化が唯一の不変であることを教え、これらの変化のパターンを理解することで、私たちは知恵と優雅さを持って人生をナビゲートできます。哲学はバランス、調和、そして宇宙エネルギーの自然な流れを強調しています。"
      },
      
      hexagrams: {
        title: "64の六十四卦",
        content: "易経は64の六十四卦で構成されており、それぞれが6つの線（実線または破線）で構成されています。これらの六十四卦は、異なる人生の状況、挑戦、機会を表しています。各六十四卦には、人生の様々な側面に対する特定の意味、解釈、指導があります。システムは、これらの64のユニークなパターンを形成するために組み合わされる8つの三爻卦に基づいています。"
      },
      
      howToUse: {
        title: "易経の使い方",
        content: "易経を使うことはシンプルですが深遠です。まず、明確な質問や意図を定式化します。次に、ランダムな六十四卦を引くか、あなたの状況に共鳴する特定の六十四卦を相談します。解釈を注意深く読み、それがあなたの人生にどのように適用されるかを反省し、それが提供する指導を考慮します。易経は知恵を提供しますが、厳格な答えではありません - 洞察をあなたの独特な状況に適用するのはあなた次第です。"
      },
      
      benefits: {
        title: "利点と応用",
        content: "易経は現代生活に多くの利点を提供します：古代の知恵を通じた意思決定の向上、より深い自己反省と個人的成長、困難な時期の指導、人生のパターンの理解の改善、そして精神的発展。それは特にキャリア決定、関係指導、個人的挑戦、そして人生の移行の理解に価値があります。"
      },
      
      gettingStarted: {
        title: "始めましょう",
        content: "易経の知恵を探求する準備はできていますか？現在の状況に対する指導を受けるためにランダムドローから始めるか、異なる人生パターンについて学ぶためにすべての64の六十四卦を閲覧してください。各読み取りは、あなたの前進の道を照らすことができる古代の知恵との会話です。"
      }
    }
  }

  const currentContent = content[language] || content.en

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
                href="/draw"
                className="flex items-center space-x-2 text-gray-700 hover:text-amber-600 transition-colors"
              >
                <Shuffle className="w-5 h-5" />
                <span>
                  {language === 'zh' ? '随机抽取' :
                   language === 'hi' ? 'रैंडम ड्रॉ' :
                   language === 'es' ? 'Sorteo Aleatorio' :
                   language === 'fr' ? 'Tirage Aléatoire' :
                   language === 'ja' ? 'ランダムドロー' :
                   'Random Draw'}
                </span>
              </Link>
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-3xl">☯</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {currentContent.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {currentContent.subtitle}
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {currentContent.hero}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* What is the I Ching */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-amber-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                <Info className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{currentContent.whatIs.title}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">{currentContent.whatIs.content}</p>
          </div>

          {/* History & Origins */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-amber-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mr-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{currentContent.history.title}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">{currentContent.history.content}</p>
          </div>

          {/* Core Philosophy */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-amber-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mr-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{currentContent.philosophy.title}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">{currentContent.philosophy.content}</p>
          </div>

          {/* The 64 Hexagrams */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-amber-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{currentContent.hexagrams.title}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">{currentContent.hexagrams.content}</p>
          </div>

          {/* How to Use */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-amber-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{currentContent.howToUse.title}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">{currentContent.howToUse.content}</p>
          </div>

          {/* Benefits & Applications */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-amber-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{currentContent.benefits.title}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">{currentContent.benefits.content}</p>
          </div>

          {/* Getting Started */}
          <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl shadow-lg p-8 border border-amber-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mr-4">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{currentContent.gettingStarted.title}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg mb-8">{currentContent.gettingStarted.content}</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href="/draw"
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-amber-200 hover:border-amber-300"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Shuffle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {language === 'zh' ? '随机抽取' :
                     language === 'hi' ? 'रैंडम ड्रॉ' :
                     language === 'es' ? 'Sorteo Aleatorio' :
                     language === 'fr' ? 'Tirage Aléatoire' :
                     language === 'ja' ? 'ランダムドロー' :
                     'Random Draw'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {language === 'zh' ? '让宇宙为你选择最合适的卦象' :
                     language === 'hi' ? 'ब्रह्मांड को आपके लिए सबसे उपयुक्त हेक्साग्राम चुनने दें' :
                     language === 'es' ? 'Deja que el universo seleccione el hexagrama más apropiado para ti' :
                     language === 'fr' ? 'Laissez l\'univers sélectionner l\'hexagramme le plus approprié pour vous' :
                     language === 'ja' ? '宇宙にあなたに最も適した卦を選ばせてください' :
                     'Let the universe select the most appropriate hexagram for you'}
                  </p>
                </div>
              </Link>

              <Link
                href="/hexagrams"
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-amber-200 hover:border-amber-300"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {language === 'zh' ? '浏览全部' :
                     language === 'hi' ? 'सभी ब्राउज़ करें' :
                     language === 'es' ? 'Explorar Todos' :
                     language === 'fr' ? 'Explorer Tous' :
                     language === 'ja' ? 'すべてを閲覧' :
                     'Browse All'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {language === 'zh' ? '探索所有64个卦象的详细含义' :
                     language === 'hi' ? 'सभी 64 हेक्साग्राम के विस्तृत अर्थों का पता लगाएं' :
                     language === 'es' ? 'Explora los significados detallados de los 64 hexagramas' :
                     language === 'fr' ? 'Explorez les significations détaillées des 64 hexagrammes' :
                     language === 'ja' ? '64の六十四卦の詳細な意味を探索' :
                     'Explore detailed meanings of all 64 hexagrams'}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-gray-600">
          <p className="mb-4">
            {language === 'zh' ? '体验易经的智慧，古代的变化之书。' :
             language === 'hi' ? 'आई चिंग की बुद्धि का अनुभव करें, प्राचीन परिवर्तन की पुस्तक।' :
             language === 'es' ? 'Experimenta la sabiduría del I Ching, el antiguo Libro de los Cambios.' :
             language === 'fr' ? 'Expérimentez la sagesse du I Ching, l\'ancien Livre des Changements.' :
             language === 'ja' ? '易経の知恵を体験してください、古代の変化の書。' :
             'Experience the wisdom of the I Ching, the ancient Book of Changes.'}
          </p>
          <p className="text-sm">
            {language === 'zh' ? '使用 Next.js、Supabase 和 ElevenLabs 构建 • 部署在 Vercel 上' :
             language === 'hi' ? 'Next.js, Supabase और ElevenLabs के साथ बनाया गया • Vercel पर तैनात' :
             language === 'es' ? 'Construido con Next.js, Supabase y ElevenLabs • Desplegado en Vercel' :
             language === 'fr' ? 'Construit avec Next.js, Supabase et ElevenLabs • Déployé sur Vercel' :
             language === 'ja' ? 'Next.js、Supabase、ElevenLabsで構築 • Vercelにデプロイ' :
             'Built with Next.js, Supabase, and ElevenLabs • Deployed on Vercel'}
          </p>
        </footer>
      </main>
    </div>
  )
}
