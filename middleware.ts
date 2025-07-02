import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;
  const userRole = req.cookies.get('user_role')?.value;

  // Jika belum login, redirect ke login
  const protectedPaths = ['/dashboard', '/category', '/product', '/stockin', '/stockout', '/user'];
  if (protectedPaths.includes(url) && !userRole) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // RBAC Rules
  const roleAccess: Record<string, string[]> = {
    '/dashboard': ['admin', 'staff'],
    '/category': ['admin'],
    '/product': ['admin'],
    '/stockin': ['admin', 'staff'],
    '/stockout': ['admin', 'staff'],
    '/user': ['admin'],
  };

  const allowedRoles = roleAccess[url];

  if (allowedRoles && !allowedRoles.includes(userRole!)) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));  // redirect ke halaman error
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/category', '/product', '/stockin', '/stockout', '/user'],
};
