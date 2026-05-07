import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'; // Buraya dikkat: next/server olmalı

export function middleware(request: NextRequest) {
  // Cookie kontrolü (Action'da set ettiğimiz isimle birebir aynı olmalı)
  const authCookie = request.cookies.get("freshflow-auth");
  const { pathname } = request.nextUrl;

  // 1. Kullanıcı zaten giriş yapmışsa ve /login'e gitmeye çalışıyorsa dashboard'a at
  if (pathname === "/login" && authCookie) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 2. Kullanıcı giriş yapmamışsa ve /login dışında bir sayfadaysa login'e çek
  if (!authCookie && pathname !== "/login") {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Hangi yollarda çalışacağını belirtiyoruz
export const config = {
  matcher: [

    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};