#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
import dotenv from 'dotenv'
dotenv.config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function populateDatabase() {
  try {
    console.log('🚀 Starting database population...')

    // Read hexagrams data
    const hexagramsPath = path.join(__dirname, 'src', 'data', 'hexagrams.json')
    const hexagramsData = JSON.parse(fs.readFileSync(hexagramsPath, 'utf8'))

    console.log(`📚 Found ${hexagramsData.length} hexagrams to insert`)

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

    // Insert hexagrams
    console.log('📝 Inserting hexagrams...')
    const { data, error } = await supabase
      .from('hexagrams')
      .insert(hexagramsData)

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
