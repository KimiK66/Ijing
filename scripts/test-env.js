#!/usr/bin/env node

// Test script to verify environment variables and API connections
require('dotenv').config({ path: '.env.local' })

console.log('🔍 Testing Environment Variables...\n')

// Test Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('📊 Supabase Configuration:')
console.log(`  URL: ${supabaseUrl ? '✅ Set' : '❌ Missing'}`)
console.log(`  Anon Key: ${supabaseAnonKey ? '✅ Set' : '❌ Missing'}`)
console.log(`  Service Key: ${supabaseServiceKey ? '✅ Set' : '❌ Missing'}`)

// Test ElevenLabs configuration
const elevenLabsKey = process.env.ELEVENLABS_API_KEY
console.log('\n🎵 ElevenLabs Configuration:')
console.log(`  API Key: ${elevenLabsKey ? '✅ Set' : '❌ Missing'}`)

// Test NextAuth configuration
const nextAuthUrl = process.env.NEXTAUTH_URL
const nextAuthSecret = process.env.NEXTAUTH_SECRET
console.log('\n🔐 NextAuth Configuration:')
console.log(`  URL: ${nextAuthUrl ? '✅ Set' : '❌ Missing'}`)
console.log(`  Secret: ${nextAuthSecret ? '✅ Set' : '❌ Missing'}`)

// Test app URL
const appUrl = process.env.NEXT_PUBLIC_APP_URL
console.log('\n🌐 App Configuration:')
console.log(`  App URL: ${appUrl ? '✅ Set' : '❌ Missing'}`)

console.log('\n📋 Summary:')
const allSet = supabaseUrl && supabaseAnonKey && supabaseServiceKey && elevenLabsKey && nextAuthUrl && nextAuthSecret

if (allSet) {
  console.log('✅ All environment variables are configured!')
  console.log('🚀 Ready for deployment!')
} else {
  console.log('❌ Some environment variables are missing.')
  console.log('📖 Please check the DEPLOYMENT_GUIDE.md for setup instructions.')
}

console.log('\n💡 Next steps:')
console.log('1. Set up your Supabase project and run the SQL commands')
console.log('2. Get your ElevenLabs API key')
console.log('3. Deploy to Vercel with these environment variables')
console.log('4. Run "npm run populate-db" to populate the database')
