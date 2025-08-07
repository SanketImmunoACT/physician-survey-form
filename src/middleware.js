import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  // Allow requests to the auth page to pass through
  if (pathname.startsWith('/auth')) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    if (pathname.startsWith('/admin') && payload.role !== 'SUPERADMIN') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }
}

export const config = {
  matcher: ['/salesperson', '/dashboard', '/form', '/admin/:path*'],
};
