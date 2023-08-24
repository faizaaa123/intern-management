// without a defined matcher, this one line applies next-auth

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// to the entire project
// export {default} from "next-auth/middleware"

// applies next-auth to specified routes

export default withAuth(

  function middleware(req) {

    //extra middlewaree for frontend - ensuring users can only access their appropriate routes depending on their role

    if(req.nextUrl.pathname.startsWith("/dashbord/supervisor") && req.nextauth.token?.role !== "Supervisor") {
      // console.log("This is what you are looking for ----------------",req.nextauth.token)
      return NextResponse.rewrite(new URL("/dashbord/intern/homepage?message=You are not authorised",req.url))
    }

    if(req.nextUrl.pathname.startsWith("/dashbord/intern") && req.nextauth.token?.role !== "Intern") {
      // console.log("This is what you are looking for ----------------",req.nextauth.token)
      return NextResponse.rewrite(new URL("/dashbord/supervisor/homepage?message=You are not authorised",req.url))
    }
  }
)

export const config = {
    matcher: ['/dashbord/:path*'],
  };