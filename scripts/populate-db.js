#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
import dotenv from 'dotenv'

dotenv.config({ path: path.join(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function populateDatabase() {
  try {
    console.log('🚀 Starting database population...')

    // Read hexagrams data - try complete dataset first, fallback to basic
    let hexagramsPath = path.join(process.cwd(), 'src', 'data', 'complete-hexagrams.json')
    let hexagramsData
    
    try {
      hexagramsData = JSON.parse(fs.readFileSync(hexagramsPath, 'utf8'))
      console.log(`📚 Using complete dataset: ${hexagramsPath}`)
    } catch (error) {
      // Fallback to basic dataset
      hexagramsPath = path.join(process.cwd(), 'src', 'data', 'hexagrams.json')
      hexagramsData = JSON.parse(fs.readFileSync(hexagramsPath, 'utf8'))
      console.log(`📚 Using basic dataset: ${hexagramsPath}`)
    }

    console.log(`📚 Processing ${hexagramsData.length} hexagrams`)

    // Clear existing data
    console.log('🧹 Clearing existing hexagrams...')
    const { error: deleteError } = await supabase
      .from('hexagrams')
      .delete()
      .neq('id', '')

    if (deleteError) {
      console.error('❌ Error clearing existing data:', deleteError)
      return
    }

    // Transform JSON data to match database schema
    const transformedData = hexagramsData.map((hexagram) => ({
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
    }))

    console.log(`📚 Found ${transformedData.length} hexagrams to insert`)

    // Insert hexagrams
    console.log('📝 Inserting hexagrams...')
    const { data, error } = await supabase
      .from('hexagrams')
      .insert(transformedData)

    if (error) {
      console.error('❌ Error inserting hexagrams:', error)
      return
    }

    console.log(`✅ Successfully inserted ${hexagramsData.length} hexagrams!`)
    console.log('🎉 Database population completed!')

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

populateDatabase()
