#!/usr/bin/env node

// Test Supabase connection directly
require('dotenv').config({ path: '.env.local' })

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('🔍 Testing Supabase Connection...')
console.log('URL:', supabaseUrl ? 'Set' : 'Not set')
console.log('Service Key:', supabaseServiceKey ? 'Set' : 'Not set')

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function testConnection() {
  try {
    console.log('📡 Testing database connection...')
    
    const { data, error, count } = await supabase
      .from('hexagrams')
      .select('*', { count: 'exact' })
      .order('number')

    if (error) {
      console.error('❌ Supabase error:', error)
      return
    }

    console.log(`✅ Successfully connected to Supabase!`)
    console.log(`📊 Found ${count} hexagrams in database`)
    console.log(`📋 First few hexagrams:`, data?.slice(0, 3).map(h => `${h.number}: ${h.chinese_name}`))

  } catch (error) {
    console.error('❌ Connection error:', error)
  }
}

testConnection()
