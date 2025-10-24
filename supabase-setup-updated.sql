-- I Ching Divination Webapp Database Setup - UPDATED VERSION
-- Run this script in your Supabase SQL editor
-- This creates the proper table structure for all 64 hexagrams

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS user_journals CASCADE;
DROP TABLE IF EXISTS user_readings CASCADE;
DROP TABLE IF EXISTS hexagrams CASCADE;

-- Create hexagrams table with proper structure for all 64 hexagrams
CREATE TABLE hexagrams (
  id TEXT PRIMARY KEY,
  number INTEGER UNIQUE NOT NULL CHECK (number >= 1 AND number <= 64),
  name JSONB NOT NULL,
  chinese_name TEXT NOT NULL,
  upper_trigram TEXT NOT NULL,
  lower_trigram TEXT NOT NULL,
  judgement JSONB NOT NULL,
  image JSONB NOT NULL,
  lines JSONB NOT NULL,
  interpretation JSONB NOT NULL,
  keywords JSONB NOT NULL,
  element TEXT NOT NULL CHECK (element IN ('Metal', 'Earth', 'Water', 'Wood', 'Fire')),
  season TEXT NOT NULL CHECK (season IN ('Spring', 'Summer', 'Autumn', 'Winter')),
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
CREATE INDEX idx_user_readings_hexagram_id ON user_readings(hexagram_id);
CREATE INDEX idx_user_journals_user_id ON user_journals(user_id);
CREATE INDEX idx_user_journals_created_at ON user_journals(created_at DESC);
CREATE INDEX idx_user_journals_reading_id ON user_journals(reading_id);
CREATE INDEX idx_hexagrams_number ON hexagrams(number);
CREATE INDEX idx_hexagrams_element ON hexagrams(element);
CREATE INDEX idx_hexagrams_season ON hexagrams(season);

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

-- Create a view for easy hexagram lookup
CREATE VIEW hexagram_lookup AS
SELECT 
  id,
  number,
  name->>'en' as english_name,
  name->>'zh' as chinese_name_short,
  chinese_name,
  upper_trigram,
  lower_trigram,
  element,
  season,
  created_at
FROM hexagrams
ORDER BY number;

-- Grant permissions for the view
GRANT SELECT ON hexagram_lookup TO authenticated;

-- Add comments for documentation
COMMENT ON TABLE hexagrams IS 'Contains all 64 I Ching hexagrams with multi-language support';
COMMENT ON TABLE user_readings IS 'Stores user divination readings and questions';
COMMENT ON TABLE user_journals IS 'Stores user personal journals and reflections';
COMMENT ON VIEW hexagram_lookup IS 'Simplified view for hexagram lookups';

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'I Ching database setup completed successfully!';
    RAISE NOTICE 'Ready to populate with all 64 hexagrams using the populate-db script.';
END $$;
