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
    return NextResponse.redirect(`${origin}/?error=oauth_error&message=${encodeURIComponent(errorDescription || error)}`)
  }

  if (code) {
    try {
      // Exchange the code for a session
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

      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (exchangeError) {
        console.error('Code exchange error:', exchangeError)
        return NextResponse.redirect(`${origin}/?error=exchange_error&message=${encodeURIComponent(exchangeError.message)}`)
      }

      console.log('=== AUTH CALLBACK SUCCESS ===')
      console.log('User:', data.user?.email)
      console.log('Session:', data.session ? 'created' : 'missing')
      
      // Redirect to profile with success
      return NextResponse.redirect(`${origin}/profile?success=true`)
    } catch (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(`${origin}/?error=callback_error&message=${encodeURIComponent(String(error))}`)
    }
  }

  // No code provided, redirect to home
  console.log('=== AUTH CALLBACK - NO CODE - REDIRECTING TO HOME ===')
  return NextResponse.redirect(`${origin}/`)
}

