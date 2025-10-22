import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const tokenKey = process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || 'nortus_token';
  // req.cookies.delete('nortus_token'); // Remover cookie antigo se existir
  const token = req.cookies.get(tokenKey)?.value;

  const { pathname } = req.nextUrl;

  const publicPaths = ['/login', '/_next', '/favicon.ico', '/api'];

  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  if (!token && !isPublicPath) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (token && pathname === '/login') {
    const homeUrl = new URL('/', req.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|_next/img).*)'],
};
