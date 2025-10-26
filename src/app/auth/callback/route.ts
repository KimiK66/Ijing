import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')
  const origin = requestUrl.origin

  console.log('=== AUTH CALLBACK START ===')
  console.log('URL:', requestUrl.toString())
  console.log('Code:', code ? 'present' : 'missing')
  console.log('Error:', error)
  console.log('Error Description:', errorDescription)

  if (error) {
    console.error('OAuth error:', error, errorDescription)
    const errorMessage = errorDescription || error || 'Authentication failed'
    return NextResponse.redirect(`${origin}/?error=oauth_error&message=${encodeURIComponent(errorMessage)}`)
  }

  if (code) {
    try {
      const response = NextResponse.redirect(`${origin}/profile`)
      
      // Exchange the code for a session and set cookies
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true,
            flowType: 'pkce' as const
          }
        }
      )

      // Handle the OAuth callback by exchanging the code for a session
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (exchangeError) {
        console.error('Code exchange error:', exchangeError)
        return NextResponse.redirect(`${origin}/?error=exchange_error&message=${encodeURIComponent(exchangeError.message)}`)
      }

      console.log('=== AUTH CALLBACK SUCCESS ===')
      console.log('User:', data.user?.email)
      console.log('Session:', data.session ? 'created' : 'missing')
      
      // Set session cookies in the response
      if (data.session) {
        // Get all cookies from Supabase
        const cookies = supabase.auth.getCookies()
        console.log('Setting session cookies:', cookies)
      }
      
      return response
    } catch (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(`${origin}/?error=callback_error&message=${encodeURIComponent(String(error))}`)
    }
  }

  // No code provided, redirect to home
  console.log('=== AUTH CALLBACK - NO CODE - REDIRECTING TO HOME ===')
  return NextResponse.redirect(`${origin}/`)
}

