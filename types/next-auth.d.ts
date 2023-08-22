import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user: {
            id: number,
            firstname: string,
            lastname?: string,
            email: string,
            accessToken: string
        }
    }

    interface User {
        id: number,
        firstname: string,
        lastname: string,
        email: string,
        accessToken: string
    }
}