import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const supabase = createSupabaseClient()
    
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Auth callback error:', error)
        return NextResponse.redirect(`${origin}/profile?error=auth_callback_error`)
      }
      
      // Successful authentication, redirect to profile
      return NextResponse.redirect(`${origin}/profile`)
    } catch (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(`${origin}/profile?error=auth_callback_error`)
    }
  }

  // No code provided, redirect to profile
  return NextResponse.redirect(`${origin}/profile`)
}

