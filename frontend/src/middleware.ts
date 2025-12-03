import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

// Define protected routes and their required roles
const protectedRoutes = {
  '/admin': ['admin'],
  '/parent': ['admin', 'parent'],
  '/student': ['admin', 'parent', 'student'],
}

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request)

  const path = request.nextUrl.pathname

  // Check if route is protected
  const protectedRoute = Object.entries(protectedRoutes).find(([route]) =>
    path.startsWith(route)
  )

  if (protectedRoute) {
    const [, allowedRoles] = protectedRoute

    // Redirect to login if not authenticated
    if (!user) {
      const redirectUrl = new URL('/login', request.url)
      redirectUrl.searchParams.set('redirect', path)
      return NextResponse.redirect(redirectUrl)
    }

    // Get user role from profile (we'll need to fetch this)
    // For now, we'll use a simple approach - in production, this should be cached
    const userRole = user.user_metadata?.role || 'student'

    // Check if user has required role
    if (!allowedRoles.includes(userRole)) {
      // Redirect to appropriate dashboard based on role
      if (userRole === 'admin') {
        return NextResponse.redirect(new URL('/admin', request.url))
      } else if (userRole === 'parent') {
        return NextResponse.redirect(new URL('/parent', request.url))
      } else {
        return NextResponse.redirect(new URL('/student', request.url))
      }
    }
  }

  // Redirect authenticated users away from auth pages
  if (user && (path === '/login' || path === '/register')) {
    const userRole = user.user_metadata?.role || 'student'
    if (userRole === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url))
    } else if (userRole === 'parent') {
      return NextResponse.redirect(new URL('/parent', request.url))
    } else {
      return NextResponse.redirect(new URL('/student', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
