
import type {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { type } from "os";
require("dotenv").config()

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Email:",
                    type: "email",
                    placeholder: "Enter email"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: ""
                },
            },
            async authorize(credentials) {
                // this is where you retreive  user info from databse.
                // check out the doc here: https://next-auth.js.org/configuration/providers/credentials
                const user = {id: 500, email: "strawberrycrumble@gmail.com", password: "Crumble"}

                if(credentials?.username === user.email && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    session : {
        strategy: "jwt",

    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development"
    
}