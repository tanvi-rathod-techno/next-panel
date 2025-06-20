// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === '/signin';
  const isProtectedRoute = pathname.startsWith('/') && pathname !== '/signin';

  // 1. User is not logged in and tries to access protected route
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // 2. User is logged in and tries to access signin page
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 3. Allow access
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/signin', '/profile/:path*'], // Add more protected routes here
};
