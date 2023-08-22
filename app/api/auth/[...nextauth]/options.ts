
import type {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {connectToMongoDB} from "../../../../library/connectToMongoDB";
const User = require("../../../../server/models/userModel");
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

                console.log(credentials)

                if(!credentials?.email || !credentials.password) {
                    return null
                    // throw new Response("Missing email, or password", { status: 400 });
                }

                await connectToMongoDB().catch((error) => {throw new Error(error)})


                //not recognising this is a model
                const user = await User.findOne({
                    email: credentials?.email
                })

                if(!user) {
                    return null
                }

                if(user.password !== credentials.password) {
                    return null
                }

                // return user object if everything is valid
                return user;
            
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