import { NextRequest, NextResponse } from 'next/server'

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

  // Simple redirect to profile - let the client handle session detection
  console.log('=== AUTH CALLBACK SUCCESS - REDIRECTING TO PROFILE ===')
  return NextResponse.redirect(`${origin}/profile`)
}

