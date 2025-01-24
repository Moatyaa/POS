import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const userToken = request.cookies.get('refreshToken');
    const userRole= request.cookies.get('role');

    if (!userToken && request.nextUrl.pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    if (userToken && userRole) {
        const isAdmin = userRole.value.includes('Admin');
        if (request.nextUrl.pathname === '/login') {
            return NextResponse.redirect(new URL('/', request.nextUrl));
        }

        if (
            !isAdmin &&
            ['/activity', '/teams'].some((path) => request.nextUrl.pathname.startsWith(path))
        ) {
            return NextResponse.redirect(new URL('/', request.nextUrl));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/login', '/settings/:path*', '/activity', '/teams', '/inventory']
};
