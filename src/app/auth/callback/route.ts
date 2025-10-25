import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const origin = requestUrl.origin

  console.log('=== AUTH CALLBACK START ===')
  console.log('URL:', requestUrl.toString())
  console.log('Code:', code ? 'present' : 'missing')
  console.log('Error:', error)

  if (error) {
    console.error('OAuth error:', error)
    return NextResponse.redirect(`${origin}/profile?error=oauth_error&message=${encodeURIComponent(error)}`)
  }

  if (code) {
    try {
      // Exchange the code for a session
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (exchangeError) {
        console.error('Code exchange error:', exchangeError)
        return NextResponse.redirect(`${origin}/profile?error=exchange_error&message=${encodeURIComponent(exchangeError.message)}`)
      }

      console.log('=== AUTH CALLBACK SUCCESS - REDIRECTING TO PROFILE ===')
      return NextResponse.redirect(`${origin}/profile`)
    } catch (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(`${origin}/profile?error=callback_error&message=${encodeURIComponent(String(error))}`)
    }
  }

  // No code provided, redirect to profile anyway
  console.log('=== AUTH CALLBACK - NO CODE - REDIRECTING TO PROFILE ===')
  return NextResponse.redirect(`${origin}/profile`)
}

