import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /profile, /hexagrams/1)
  const path = request.nextUrl.pathname

  // Define paths that require authentication
  const protectedPaths = ['/profile', '/api/readings', '/api/journals']
  
  // Check if the current path requires authentication
  const isProtectedPath = protectedPaths.some(protectedPath => 
    path.startsWith(protectedPath)
  )

  // For now, we'll allow all requests through
  // In a real implementation, you would check for authentication tokens here
  if (isProtectedPath) {
    // You would check for valid authentication here
    // For example:
    // const token = request.cookies.get('auth-token')
    // if (!token) {
    //   return NextResponse.redirect(new URL('/login', request.url))
    // }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}
