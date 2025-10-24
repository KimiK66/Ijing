-- I Ching Divination Webapp Database Setup - FINAL VERSION
-- Run this script in your Supabase SQL editor

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS user_journals CASCADE;
DROP TABLE IF EXISTS user_readings CASCADE;
DROP TABLE IF EXISTS hexagrams CASCADE;

-- Create hexagrams table
CREATE TABLE hexagrams (
  id TEXT PRIMARY KEY,
  number INTEGER UNIQUE NOT NULL,
  name JSONB NOT NULL,
  chinese_name TEXT NOT NULL,
  upper_trigram TEXT NOT NULL,
  lower_trigram TEXT NOT NULL,
  judgement JSONB NOT NULL,
  image JSONB NOT NULL,
  lines JSONB NOT NULL,
  interpretation JSONB NOT NULL,
  keywords JSONB NOT NULL,
  element TEXT NOT NULL,
  season TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_readings table with correct UUID type
CREATE TABLE user_readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  hexagram_id TEXT NOT NULL REFERENCES hexagrams(id) ON DELETE CASCADE,
  question TEXT,
  context TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_journals table with correct UUID type
CREATE TABLE user_journals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reading_id UUID REFERENCES user_readings(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_journals ENABLE ROW LEVEL SECURITY;

-- User readings policies
CREATE POLICY "Users can view their own readings" ON user_readings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own readings" ON user_readings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own readings" ON user_readings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own readings" ON user_readings
  FOR DELETE USING (auth.uid() = user_id);

-- User journals policies
CREATE POLICY "Users can view their own journals" ON user_journals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own journals" ON user_journals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own journals" ON user_journals
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own journals" ON user_journals
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_user_readings_user_id ON user_readings(user_id);
CREATE INDEX idx_user_readings_timestamp ON user_readings(timestamp DESC);
CREATE INDEX idx_user_journals_user_id ON user_journals(user_id);
CREATE INDEX idx_user_journals_created_at ON user_journals(created_at DESC);
CREATE INDEX idx_hexagrams_number ON hexagrams(number);

-- Insert sample hexagrams (first 2 hexagrams)
INSERT INTO hexagrams (
  id, number, name, chinese_name, upper_trigram, lower_trigram,
  judgement, image, lines, interpretation, keywords, element, season
) VALUES 
(
  'hexagram-01',
  1,
  '{"en": "The Creative", "zh": "乾", "hi": "सृजनात्मक", "es": "Lo Creativo", "fr": "Le Créateur", "ja": "創造"}',
  '乾',
  '☰',
  '☰',
  '{"en": "The Creative works sublime success, Furthering through perseverance.", "zh": "元亨利貞", "hi": "सृजनात्मक उदात्त सफलता लाता है, दृढ़ता के माध्यम से आगे बढ़ता है।", "es": "Lo Creativo obra sublime éxito, Avanzando a través de la perseverancia.", "fr": "Le Créateur œuvre sublime succès, Progressant par la persévérance.", "ja": "創造は崇高な成功をもたらし、忍耐を通じて前進する。"}',
  '{"en": "Heaven moves with power. The superior man makes himself strong and untiring.", "zh": "天行健，君子以自強不息", "hi": "स्वर्ग शक्ति के साथ चलता है। श्रेष्ठ व्यक्ति खुद को मजबूत और अथक बनाता है।", "es": "El cielo se mueve con poder. El hombre superior se hace fuerte e incansable.", "fr": "Le ciel se meut avec puissance. L''homme supérieur se rend fort et infatigable.", "ja": "天は力強く動く。君子は自分を強くし、倦むことなくする。"}',
  '[{"lineNumber": 1, "text": {"en": "Hidden dragon. Do not act.", "zh": "潛龍勿用", "hi": "छुपा हुआ ड्रैगन। कार्य न करें।", "es": "Dragón oculto. No actúes.", "fr": "Dragon caché. N''agis pas.", "ja": "潜龍用いる勿れ"}, "meaning": {"en": "The dragon is still hidden in the depths. It is not yet time for action.", "zh": "龍還在深處潛藏，行動的時機尚未到來", "hi": "ड्रैगन अभी भी गहराई में छुपा हुआ है। कार्य करने का समय अभी नहीं आया है।", "es": "El dragón aún está oculto en las profundidades. No es aún momento para actuar.", "fr": "Le dragon est encore caché dans les profondeurs. Ce n''est pas encore le moment d''agir.", "ja": "龍はまだ深く潜んでいる。行動の時機はまだ来ていない。"}, "changing": false}]',
  '{"en": "The Creative represents the primal power of the universe, the source of all creation. It symbolizes strength, leadership, and the ability to bring forth new beginnings.", "zh": "乾卦代表宇宙的原始力量，是所有创造的源泉。它象征着力量、领导力和开创新局面的能力。", "hi": "सृजनात्मक ब्रह्मांड की आदिम शक्ति का प्रतिनिधित्व करता है, सभी निर्माण का स्रोत। यह शक्ति, नेतृत्व और नई शुरुआत लाने की क्षमता का प्रतीक है।", "es": "Lo Creativo representa el poder primario del universo, la fuente de toda creación. Simboliza fuerza, liderazgo y la capacidad de traer nuevos comienzos.", "fr": "Le Créateur représente le pouvoir primaire de l''univers, la source de toute création. Il symbolise la force, le leadership et la capacité d''apporter de nouveaux commencements.", "ja": "創造は宇宙の原始的な力を表し、すべての創造の源である。力、リーダーシップ、新しい始まりをもたらす能力を象徴している。"}',
  '{"en": "strength, leadership, creativity, initiative, power, heaven, yang", "zh": "力量、领导力、创造力、主动性、权力、天、阳", "hi": "शक्ति, नेतृत्व, रचनात्मकता, पहल, शक्ति, स्वर्ग, यांग", "es": "fuerza, liderazgo, creatividad, iniciativa, poder, cielo, yang", "fr": "force, leadership, créativité, initiative, pouvoir, ciel, yang", "ja": "力、リーダーシップ、創造性、イニシアチブ、力、天、陽"}',
  'Metal',
  'Spring'
),
(
  'hexagram-02',
  2,
  '{"en": "The Receptive", "zh": "坤", "hi": "ग्रहणशील", "es": "Lo Receptivo", "fr": "Le Réceptif", "ja": "受容"}',
  '坤',
  '☷',
  '☷',
  '{"en": "The Receptive brings about sublime success, Furthering through the mare.", "zh": "元亨利牝馬之貞", "hi": "ग्रहणशील उदात्त सफलता लाता है, मादा घोड़ी के माध्यम से आगे बढ़ता है।", "es": "Lo Receptivo trae sublime éxito, Avanzando a través de la yegua.", "fr": "Le Réceptif apporte sublime succès, Progressant par la jument.", "ja": "受容は崇高な成功をもたらし、牝馬を通じて前進する。"}',
  '{"en": "The earth''s condition is receptive devotion. The superior man who has breadth of character carries the outer world.", "zh": "地勢坤，君子以厚德載物", "hi": "पृथ्वी की स्थिति ग्रहणशील भक्ति है। चरित्र की चौड़ाई वाला श्रेष्ठ व्यक्ति बाहरी दुनिया को वहन करता है।", "es": "La condición de la tierra es devoción receptiva. El hombre superior que tiene amplitud de carácter lleva el mundo exterior.", "fr": "La condition de la terre est dévotion réceptive. L''homme supérieur qui a l''amplitude de caractère porte le monde extérieur.", "ja": "地の勢いは受容的献身である。品格の広さを持つ君子は外界を担う。"}',
  '[{"lineNumber": 1, "text": {"en": "Frost underfoot. Solid ice is not far off.", "zh": "履霜堅冰至", "hi": "पैरों के नीचे पाला। ठोस बर्फ दूर नहीं है।", "es": "Escarcha bajo los pies. El hielo sólido no está lejos.", "fr": "Givre sous les pieds. La glace solide n''est pas loin.", "ja": "霜を履む、堅冰至らんとす"}, "meaning": {"en": "The first signs of winter appear. One must prepare for the coming cold.", "zh": "冬天的第一个迹象出现了。必须为即将到来的寒冷做准备。", "hi": "सर्दियों के पहले संकेत दिखाई देते हैं। आने वाली ठंड के लिए तैयारी करनी चाहिए।", "es": "Aparecen los primeros signos del invierno. Uno debe prepararse para el frío que viene.", "fr": "Les premiers signes de l''hiver apparaissent. Il faut se préparer au froid qui vient.", "ja": "冬の最初の兆候が現れる。来る寒さに備えなければならない。"}, "changing": false}]',
  '{"en": "The Receptive represents the feminine principle, the earth, and the capacity to receive and nurture. It symbolizes patience, devotion, and the power of yielding.", "zh": "坤卦代表女性原则、大地以及接受和培育的能力。它象征着耐心、奉献和柔顺的力量。", "hi": "ग्रहणशील स्त्री सिद्धांत, पृथ्वी, और प्राप्त करने और पालन-पोषण करने की क्षमता का प्रतिनिधित्व करता है। यह धैर्य, भक्ति और झुकने की शक्ति का प्रतीक है।", "es": "Lo Receptivo representa el principio femenino, la tierra, y la capacidad de recibir y nutrir. Simboliza paciencia, devoción y el poder de ceder.", "fr": "Le Réceptif représente le principe féminin, la terre, et la capacité de recevoir et nourrir. Il symbolise la patience, la dévotion et le pouvoir de céder.", "ja": "受容は女性の原理、大地、そして受け入れ育む能力を表す。忍耐、献身、そして屈する力を象徴している。"}',
  '{"en": "receptivity, earth, devotion, patience, yielding, support, yin", "zh": "接受性、大地、奉献、耐心、柔顺、支持、阴", "hi": "ग्रहणशीलता, पृथ्वी, भक्ति, धैर्य, झुकना, समर्थन, यिन", "es": "receptividad, tierra, devoción, paciencia, ceder, apoyo, yin", "fr": "réceptivité, terre, dévotion, patience, céder, soutien, yin", "ja": "受容性、大地、献身、忍耐、屈する、支持、陰"}',
  'Earth',
  'Autumn'
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for hexagrams table
CREATE TRIGGER update_hexagrams_updated_at BEFORE UPDATE ON hexagrams
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for user_journals table
CREATE TRIGGER update_user_journals_updated_at BEFORE UPDATE ON user_journals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
