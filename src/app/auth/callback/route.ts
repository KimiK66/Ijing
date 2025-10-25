import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/profile'
  const origin = requestUrl.origin

  console.log('Auth callback received:', { code: !!code, origin, next })

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
      console.log('Attempting to exchange code for session...')
      
      // Use the proper method for PKCE code exchange
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Auth callback error:', error)
        return NextResponse.redirect(`${origin}/?error=auth_callback_error&message=${encodeURIComponent(error.message)}`)
      }
      
      console.log('Authentication successful:', !!data.session)
      
      // Successful authentication, redirect to intended page
      return NextResponse.redirect(`${origin}${next}`)
    } catch (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(`${origin}/?error=auth_callback_error&message=${encodeURIComponent('Authentication failed')}`)
    }
  }

  console.log('No code provided, redirecting to home')
  // No code provided, redirect to home
  return NextResponse.redirect(`${origin}/`)
}

