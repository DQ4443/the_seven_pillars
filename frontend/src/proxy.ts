import { type NextRequest, NextResponse } from 'next/server'
import { updateSession, type UserRole } from '@/lib/supabase/middleware'

// Define protected routes and their required roles
const protectedRoutes: Record<string, UserRole[]> = {
  '/admin': ['admin'],
  '/parent': ['admin', 'parent'],
  '/student': ['admin', 'parent', 'student'],
}

// Get the appropriate dashboard URL for a role
function getDashboardUrl(role: UserRole): string {
  switch (role) {
    case 'admin':
      return '/admin'
    case 'parent':
      return '/parent'
    default:
      return '/student'
  }
}

export async function proxy(request: NextRequest) {
  const { supabaseResponse, user, role } = await updateSession(request)

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

    // Check if user has required role (role is fetched from profiles table)
    if (!allowedRoles.includes(role)) {
      return NextResponse.redirect(new URL(getDashboardUrl(role), request.url))
    }
  }

  // Redirect authenticated users away from auth pages
  if (user && (path === '/login' || path === '/register')) {
    return NextResponse.redirect(new URL(getDashboardUrl(role), request.url))
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
