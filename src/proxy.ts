import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Next.js 16 proxy — runs at the edge for every matched request.
 * Handles route protection and redirects for auth pages.
 */

/** Routes that require authentication */
const PROTECTED_ROUTES = ['/dashboard']

/** Routes only accessible to unauthenticated users */
const AUTH_ROUTES = ['/login', '/register']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check for session token (NextAuth JWT cookie)
  const token =
    request.cookies.get('next-auth.session-token')?.value ??
    request.cookies.get('__Secure-next-auth.session-token')?.value

  const isAuthenticated = !!token

  // Redirect unauthenticated users away from protected routes
  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Redirect authenticated users away from auth pages
  if (AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api/auth (auth endpoints must be accessible)
     * - _next/static, _next/image (static assets)
     * - favicon.ico, public files
     */
    '/((?!api/auth|_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
