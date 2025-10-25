import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const origin = requestUrl.origin

  console.log('Auth callback - Code:', code ? 'present' : 'missing')
  console.log('Auth callback - Error:', error)

  if (error) {
    console.error('OAuth error:', error)
    return NextResponse.redirect(`${origin}/profile?error=oauth_error&message=${encodeURIComponent(error)}`)
  }

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          flowType: 'pkce',
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true
        }
      }
    )
    
    try {
      console.log('Exchanging code for session...')
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (exchangeError) {
        console.error('Auth callback error:', exchangeError)
        return NextResponse.redirect(`${origin}/profile?error=auth_callback_error&message=${encodeURIComponent(exchangeError.message)}`)
      }
      
      console.log('Authentication successful:', data.user?.email)
      // Successful authentication, redirect to profile
      return NextResponse.redirect(`${origin}/profile`)
    } catch (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(`${origin}/profile?error=auth_callback_error&message=${encodeURIComponent(String(error))}`)
    }
  }

  // No code provided, redirect to profile
  console.log('No code provided, redirecting to profile')
  return NextResponse.redirect(`${origin}/profile`)
}

