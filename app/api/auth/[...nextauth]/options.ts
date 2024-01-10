
// import type {NextAuthOptions} from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import {connectToMongoDB} from "../../../../library/connectToMongoDB";
// import { signJwtAccessToken, signJwtRefreshToken } from "@/library/jwt";
// import bcrypt from "bcrypt";
// import { signIn } from "next-auth/react";
// const User = require("../../../../server/models/userModel");
// const Supervisor = require("../../../../server/models/supervisorModel");
// require("dotenv").config()


// export const options: NextAuthOptions = {
//     providers: [
//         CredentialsProvider({
//             id: "login",
//             name: "Credentials",
//             credentials: {

//                 email: {
//                     label: "Email:",
//                     type: "email",
//                     placeholder: "Enter email"
//                 },
//                 password: {
//                     label: "Password:",
//                     type: "password",
//                     placeholder: ""
//                 },
//             },
//             async authorize(credentials) {
//                 // this is where you retreive  user info from databse.
//                 // check out the doc here: https://next-auth.js.org/configuration/providers/credentials

//                 // console.log(credentials)

//                 if(!credentials?.email || !credentials.password) {
//                     return null
//                 }

//                 await connectToMongoDB().catch((error) => {throw new Error(error)})


                
//                 const user = await User.findOne({
//                     email: credentials?.email
//                 }) || await Supervisor.findOne({
//                     email: credentials?.email
//                 })

//                 if(!user) {
//                     return null
//                 }

//                 const match = await bcrypt.compare(credentials.password, user.password)

//                 if(user.password !== credentials.password) {
//                     return null
//                 }

//                 return user;
            
//         }}),
//         CredentialsProvider({
//             id: "signup",
//             name: "Credentials",
//             credentials: {

//                 firstname: {
//                     label: "Firstname",
//                     type: "firstname",
//                     placeholder: "Enter firstname"
//                 },
//                 lastname: {
//                     label: "Lastname",
//                     type: "lastname",
//                     placeholder: "Enter lastname"
//                 },
//                 email: {
//                     label: "Email:",
//                     type: "email",
//                     placeholder: "Enter email"
//                 },
//                 password: {
//                     label: "Password:",
//                     type: "password",
//                     placeholder: ""
//                 },
//             },
//             async authorize(credentials) {

//                 if(!credentials?.email || !credentials.password) {
//                     return null
//                 }

//                 await connectToMongoDB().catch((error) => {throw new Error(error)})

//                 const hashedPassword = await bcrypt.hash(credentials.password, 10);

//                 const newIntern = await User.create({
//                     firstname: `${credentials.firstname.charAt(0).toUpperCase()}${credentials.firstname.slice(1)}`, //converting to title case
//                     lastname: `${credentials.lastname.charAt(0).toUpperCase()}${credentials.lastname.slice(1)}`,
//                     email: credentials.email,
//                     password: hashedPassword,
//                     //   role: "Intern"
//                   });

//                 return newIntern;
            
//         }}),
//     ],
//     session : {
//         strategy: "jwt",

//     },
//     callbacks: {
//         jwt: async ({token, user, session}) => {
//             // console.log("jwt callback ", {token, user, session})
//             // if(user) token.user = user;

//             if(user) {
//                 // pass in user id to token
//                 return {
//                     ...token,
//                     id: user.id,
//                     firstname: user.firstname,
//                     lastname: user.lastname,
//                     role: user.role,
//                     accessToken: signJwtAccessToken({user}),
//                     refreshToken: signJwtRefreshToken({user})
//                     // name: user.firstname
//                 }
//             }
//             return token
//         },
//         session: async({session, token, user}) => {
//             // if(session.user) {

//             // }
//             // session.user.name = token.user.firstname
//             // pass user.id to the session
//             // console.log("session callback ", {session, token, user})
//             return {
//                 ...session,
//                 user: {
//                     ...session.user,
//                     id: token.id,
//                     name: `${token.firstname} ${token.lastname}`,
//                     firstname: token.firstname,
//                     lastname: token.lastname,
//                     role: token.role,
//                     accessToken: token.accessToken,
//                     refreshToken: token.refreshToken
//                 }
//             };
//         },
//     },
//     secret: process.env.NEXTAUTH_SECRET,
//     debug: process.env.NODE_ENV === "development"

    
    
// }

// // const handler = NextAuth(options)

// // export { handler as GET, handler as POST } 

// --------------------------------------------------------------------------

// pages/api/auth/[...nextauth].ts

import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signJwtAccessToken, signJwtRefreshToken } from "@/library/jwt";
import {connectToMongoDB} from "../../../../library/connectToMongoDB";
import bcrypt from "bcrypt";
import { signIn } from "next-auth/react";
const User = require("../../../../server/models/userModel");
const Supervisor = require("../../../../server/models/supervisorModel");
require("dotenv").config()

export default async function options(req: NextApiRequest, res: NextApiResponse) {
  // Define your credential providers
  const credentialProviders = [
    CredentialsProvider({
        id: "login",
        name: "Credentials",
        credentials: {

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

            // console.log(credentials)

            if(!credentials?.email || !credentials.password) {
                return null
            }

            await connectToMongoDB().catch((error) => {throw new Error(error)})


            
            const user = await User.findOne({
                email: credentials?.email
            }) || await Supervisor.findOne({
                email: credentials?.email
            })

            if(!user) {
                return null
            }

            const match = await bcrypt.compare(credentials.password, user.password)

            if(user.password !== credentials.password) {
                return null
            }

            return user;
        
    }}),
    CredentialsProvider({
        id: "signup",
        name: "Credentials",
        credentials: {

            firstname: {
                label: "Firstname",
                type: "firstname",
                placeholder: "Enter firstname"
            },
            lastname: {
                label: "Lastname",
                type: "lastname",
                placeholder: "Enter lastname"
            },
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

            if(!credentials?.email || !credentials.password) {
                return null
            }

            await connectToMongoDB().catch((error) => {throw new Error(error)})

            const hashedPassword = await bcrypt.hash(credentials.password, 10);

            const newIntern = await User.create({
                firstname: `${credentials.firstname.charAt(0).toUpperCase()}${credentials.firstname.slice(1)}`, //converting to title case
                lastname: `${credentials.lastname.charAt(0).toUpperCase()}${credentials.lastname.slice(1)}`,
                email: credentials.email,
                password: hashedPassword,
                //   role: "Intern"
                });

            return newIntern;
        
    }}),

    ]

  // Check if the request is for the default sign-in page
  const isDefaultSignInPage = req.method === "GET" && req.query.nextauth?.includes("signin");

  // Filter providers based on the page request
  const providers = isDefaultSignInPage
    ? credentialProviders.slice(0, 1) // Show only the first credential provider
    : credentialProviders;

  // Pass the providers to NextAuth and include the callbacks and session configuration
  return await NextAuth(req, res, {
      providers,
      session: {
        strategy: "jwt",
      },
    callbacks: {
      jwt: async ({ token, user, session }) => {
        if (user) {
          return {
            ...token,
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role,
            accessToken: signJwtAccessToken({ user }),
            refreshToken: signJwtRefreshToken({ user }),
          };
        }
        return token;
      },
      session: async ({ session, token, user }) => {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            name: `${token.firstname} ${token.lastname}`,
            firstname: token.firstname,
            lastname: token.lastname,
            role: token.role,
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
          },
        };
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development"
    // Other options...
  });
}