// without a defined matcher, this one line applies next-auth
// to the entire project
export {default} from "next-auth/middleware"

// applies next-auth to specified routes

export const config = {
    matcher: ['/dashbord/:path*'],
  };