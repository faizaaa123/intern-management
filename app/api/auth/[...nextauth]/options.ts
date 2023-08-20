
import type {NextAuthOptions} from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { type } from "os";
import {connectToMongoDB} from "../../../../library/connectToMongoDB"
import User from "../../../../server/models/userModel"
import bcrypt from "bcrypt"
require("dotenv").config()

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                // firstname: {
                //     label: "Firstname:",
                //     type: "text",
                //     placeholder: "Enter your firstname"
                // },
                // lastname: {
                //     label: "Lastname:",
                //     type: "text",
                //     placeholder: "Enter your lastname"
                // },
                email: {
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

                // Code that is throw error due to user schema

                if(!credentials?.email || !credentials.password) {
                    return new Response("Missing name, email, or password", { status: 400 });
                }

                await connectToMongoDB().catch((error) => {throw new Error(error)})

                const user = await User.findOne({where: {
                    email: credentials?.email
                }})

                if(!user) {
                    return new Response("Incorrect email provided.", {status: 400})
                }
                
                // return user object if everything is valid
                return user;

                // const user = {id: 500, email: "applecrumble@gmail.com", password: "Crumble"}

                // if(credentials?.email === user.email && credentials?.password === user.password) {
                //     return user
                // } else {
                //     return null
                // }
            
        }}),
    ],
    session : {
        strategy: "jwt",

    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development"
    
}

// const handler = NextAuth(options)

// export { handler as GET, handler as POST } 