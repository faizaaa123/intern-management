// without a defined matcher, this one line applies next-auth

import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// to the entire project
// export {default} from "next-auth/middleware"

// applies next-auth to specified routes

export default withAuth(
  async function middleware(req) {
    //extra middlewaree for frontend - ensuring users can only access their appropriate routes depending on their role

    if (
      req.nextauth.token?.role &&
      req.nextUrl.pathname.startsWith('/dashboard/supervisor') &&
      req.nextauth.token?.role != 'Supervisor'
    ) {
      // console.log("This is what you are looking for ----------------",req.nextauth.token)
      return NextResponse.redirect(
        new URL(
          '/dashboard/intern/homepage?message=You are not authorised',
          req.url
        )
      );
    }

    if (
      req.nextauth.token?.role &&
      req.nextUrl.pathname.startsWith('/dashboard/intern') &&
      req.nextauth.token?.role != 'Intern'
    ) {
      // console.log("This is what you are looking for ----------------",req.nextauth.token)
      return NextResponse.redirect(
        new URL(
          '/dashboard/supervisor/homepage?message=You are not authorised',
          req.url
        )
      );
    }
    if (
      !req.nextauth.token &&
      (req.nextUrl.pathname.startsWith('/dashboard') ||
        req.nextUrl.pathname.startsWith('/register/role'))
    ) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    if (
      req.nextauth.token?.role &&
      (req.nextUrl.pathname.startsWith('/login') ||
        req.nextUrl.pathname.startsWith('/register'))
    ) {
      return NextResponse.redirect(new URL('/dashboard/redirect', req.url));
    }
    if (
      req.nextauth.token &&
      !req.nextauth.token?.role &&
      req.nextUrl.pathname !== '/register/role'
    ) {
      return NextResponse.redirect(new URL('/register/role', req.url));
    }
  },
  {
    callbacks: {
      authorized: () => {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/register/:path*', '/login', '/dashboard/:path*'],
};
