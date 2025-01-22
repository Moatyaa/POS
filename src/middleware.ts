import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const userToken = request.cookies.get('refreshToken');

    if (userToken && request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if (!userToken && request.nextUrl.pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/login','/settings/:path*', '/activity','/teams'],
};
