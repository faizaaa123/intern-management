
import type {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {connectToMongoDB} from "../../../../library/connectToMongoDB";
import { signJwtAccessToken } from "@/library/jwt";
const User = require("../../../../server/models/userModel");
require("dotenv").config()

// let accessToken : string;

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

                console.log(credentials)

                if(!credentials?.email || !credentials.password) {
                    return null
                    // throw new Response("Missing email, or password", { status: 400 });
                }

                await connectToMongoDB().catch((error) => {throw new Error(error)})


                
                const user = await User.findOne({
                    email: credentials?.email
                })

                if(!user) {
                    return null
                }

                if(user.password !== credentials.password) {
                    return null
                }

                // payload needs to be a plain object, so must pass through {} as `user` is coming from mongoose
                // accessToken = signJwtAccessToken({user});

                // const result = {
                //     ...user,
                //     accessToken
                // }

                // console.log(result)

                // return user object if everything is valid
                return user;
            
        }}),
    ],
    session : {
        strategy: "jwt",

    },
    callbacks: {
        jwt: async ({token, user, session}) => {
            console.log("jwt callback ", {token, user, session})
            // if(user) token.user = user;

            if(user) {
                // pass in user id to token
                return {
                    ...token,
                    id: user.id,
                    accessToken: signJwtAccessToken({user})
                    // name: user.firstname
                }
            }
            return token
        },
        session: async({session, token, user}) => {
            if(session.user) 
            // session.user.name = token.user.firstname
            // pass user.id to the session
            console.log("session callback ", {session, token, user})
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    accessToken: signJwtAccessToken({user})
                }
            };
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development"
    
}

// const handler = NextAuth(options)

// export { handler as GET, handler as POST } 