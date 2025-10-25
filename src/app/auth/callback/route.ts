import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Auth callback error:', error)
        return NextResponse.redirect(`${origin}/?error=auth_callback_error&message=${encodeURIComponent(error.message)}`)
      }
      
      // Successful authentication, redirect to profile
      return NextResponse.redirect(`${origin}/profile`)
    } catch (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(`${origin}/?error=auth_callback_error&message=${encodeURIComponent('Authentication failed')}`)
    }
  }

  // No code provided, redirect to home
  return NextResponse.redirect(`${origin}/`)
}

