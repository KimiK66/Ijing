import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const access_token = requestUrl.searchParams.get('access_token')
  const refresh_token = requestUrl.searchParams.get('refresh_token')
  const origin = requestUrl.origin

  console.log('=== AUTH CALLBACK START ===')
  console.log('URL:', requestUrl.toString())
  console.log('Code:', code ? 'present' : 'missing')
  console.log('Access Token:', access_token ? 'present' : 'missing')
  console.log('Refresh Token:', refresh_token ? 'present' : 'missing')
  console.log('Error:', error)
  console.log('Origin:', origin)

  if (error) {
    console.error('OAuth error:', error)
    return NextResponse.redirect(`${origin}/profile?error=oauth_error&message=${encodeURIComponent(error)}`)
  }

  // Handle implicit flow (access_token in URL)
  if (access_token) {
    console.log('Implicit flow detected - access token present')
    const response = NextResponse.redirect(`${origin}/profile`)
    
    // Set session cookies for implicit flow
    response.cookies.set('sb-access-token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })
    
    if (refresh_token) {
      response.cookies.set('sb-refresh-token', refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30 // 30 days
      })
    }
    
    console.log('=== IMPLICIT FLOW SUCCESS - REDIRECTING TO PROFILE ===')
    return response
  }

  // Handle authorization code flow
  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
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
      
      console.log('Authentication successful!')
      console.log('User:', data.user?.email)
      console.log('Session:', data.session ? 'created' : 'missing')
      
      // Set cookies for the session
      const response = NextResponse.redirect(`${origin}/profile`)
      
      // Set session cookies
      if (data.session) {
        response.cookies.set('sb-access-token', data.session.access_token, {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7 // 7 days
        })
        response.cookies.set('sb-refresh-token', data.session.refresh_token, {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 30 // 30 days
        })
      }
      
      console.log('=== AUTH CALLBACK SUCCESS - REDIRECTING TO PROFILE ===')
      return response
    } catch (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(`${origin}/profile?error=auth_callback_error&message=${encodeURIComponent(String(error))}`)
    }
  }

  // No code or token provided, redirect to profile
  console.log('No code or token provided, redirecting to profile')
  return NextResponse.redirect(`${origin}/profile`)
}

