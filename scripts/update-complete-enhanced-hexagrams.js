#!/usr/bin/env node

// Database update script for complete enhanced hexagrams
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function updateDatabase() {
  try {
    console.log('🔄 Updating database with complete enhanced hexagrams...');
    
    // Read enhanced dataset
    const enhancedPath = path.join(process.cwd(), 'src', 'data', 'complete-enhanced-hexagrams.json');
    const enhancedData = JSON.parse(fs.readFileSync(enhancedPath, 'utf8'));
    
    // Transform data for database
    const transformedData = enhancedData.map(hexagram => ({
      id: hexagram.id,
      number: hexagram.number,
      name: hexagram.name,
      chinese_name: hexagram.chineseName,
      upper_trigram: hexagram.upperTrigram,
      lower_trigram: hexagram.lowerTrigram,
      judgement: hexagram.judgement,
      image: hexagram.image,
      lines: hexagram.lines,
      interpretation: hexagram.interpretation,
      keywords: hexagram.keywords,
      element: hexagram.element,
      season: hexagram.season,
    }));
    
    // Update database
    for (const hexagram of transformedData) {
      const { error } = await supabase
        .from('hexagrams')
        .upsert(hexagram, { onConflict: 'id' });
        
      if (error) {
        console.error(`❌ Error updating hexagram ${hexagram.number}:`, error);
      } else {
        console.log(`✅ Updated hexagram ${hexagram.number}: ${hexagram.name.en}`);
      }
    }
    
    console.log('🎉 Database update completed successfully!');
    console.log('📈 Users will now have much richer, more valuable descriptions!');
    
  } catch (error) {
    console.error('❌ Error updating database:', error);
  }
}

updateDatabase();
