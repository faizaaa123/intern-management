// import NextAuth from "next-auth"
// import {options} from "./options";

// const handler = NextAuth(options)

// export { handler as GET, handler as POST }

// TODO: add comments throughout my code to explan what's going on at each stage
// TODO: add token revocation so that if user logs out before expiration, blacklist the token for security purposes

import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signJwtAccessToken, signJwtRefreshToken } from '@/library/jwt';
import { connectToMongoDB } from '../../../../library/connectToMongoDB';
import bcrypt from 'bcrypt';
import { signIn } from 'next-auth/react';
const User = require('../../../../server/models/userModel');
const Supervisor = require('../../../../server/models/supervisorModel');
require('dotenv').config();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Defining credential providers
  const credentialProviders = [
    CredentialsProvider({
      id: 'login',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email:',
          type: 'email',
          placeholder: 'Enter email',
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: '',
        },
      },
      async authorize(credentials) {
        // this is where you retreive user info from database.
        // check out the doc here: https://next-auth.js.org/configuration/providers/credentials

        // if field is missing email/password, throw error
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        await connectToMongoDB().catch((error) => {
          throw new Error(error);
        });

        // find user from database
        const user =
          (await User.findOne({
            email: credentials?.email,
          })) ||
          (await Supervisor.findOne({
            email: credentials?.email,
          }));

        if (!user) {
          return null;
        }

        // checking if password matches
        const match = await bcrypt.compare(credentials.password, user.password);

        //TODO: change this in the future so that it only checks whether the hashed password matches user's password
        if (user.password !== credentials.password) {
          if (!match) {
            return null;
          }
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: 'updateRole',
      name: 'Credentials',
      credentials: {
        firstname: {
          label: 'Firstname',
          type: 'firstname',
          placeholder: 'Enter firstname',
        },
        lastname: {
          label: 'Lastname',
          type: 'lastname',
          placeholder: 'Enter lastname',
        },
        email: {
          label: 'Email:',
          type: 'email',
          placeholder: 'Enter email',
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: '',
        },
        role: {
          label: 'Role:',
          type: 'role',
          placeholder: '',
        },
      },
      async authorize(credentials) {
        console.log(
          credentials?.email,
          credentials?.password,
          credentials?.role,
          credentials?.firstname,
          credentials?.lastname
        );

        if (!credentials?.email || !credentials.password) {
          return null;
        }

        await connectToMongoDB().catch((error) => {
          throw new Error(error);
        });

        const hashedPassword = await bcrypt.hash(credentials.password, 10);

        // creating the new user
        const newIntern = await User.create({
          firstname: `${credentials.firstname
            .charAt(0)
            .toUpperCase()}${credentials.firstname.slice(1)}`, //converting to title case
          lastname: `${credentials.lastname
            .charAt(0)
            .toUpperCase()}${credentials.lastname.slice(1)}`,
          email: credentials.email,
          password: hashedPassword,
          role: credentials.role,
        });
        return newIntern;
      },
    }),
    // this is the registration form that is handled in the backend only
    CredentialsProvider({
      id: 'signup',
      name: 'Credentials',
      credentials: {
        firstname: {
          label: 'Firstname',
          type: 'firstname',
          placeholder: 'Enter firstname',
        },
        lastname: {
          label: 'Lastname',
          type: 'lastname',
          placeholder: 'Enter lastname',
        },
        email: {
          label: 'Email:',
          type: 'email',
          placeholder: 'Enter email',
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: '',
        },
        role: {
          label: 'Role:',
          type: 'role',
          placeholder: '',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        await connectToMongoDB().catch((error) => {
          throw new Error(error);
        });

        const hashedPassword = await bcrypt.hash(credentials.password, 10);

        // creating the new user
        const newIntern = await User.create({
          firstname: `${credentials.firstname
            .charAt(0)
            .toUpperCase()}${credentials.firstname.slice(1)}`, //converting to title case
          lastname: `${credentials.lastname
            .charAt(0)
            .toUpperCase()}${credentials.lastname.slice(1)}`,
          email: credentials.email,
          password: hashedPassword,
          role: credentials.role,
        });

        return newIntern;
      },
    }),
  ];

  // Check if the request is for the default sign-in page
  const isDefaultSignInPage =
    req.method === 'GET' && req.url?.includes('signin');

  // Filter providers based on the page request
  const providers = isDefaultSignInPage
    ? credentialProviders.slice(0, 2)
    : // Show only the first credential provider

      credentialProviders;

  // Pass the providers to NextAuth and include the callbacks and session configuration
  return await NextAuth(req, res, {
    providers,
    session: {
      strategy: 'jwt',
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
      signIn: async ({ profile, user, account }) => {
        if (account?.provider === 'google') {
          if (user.name) {
            user.firstname = user.name.split(' ')[0];
            user.lastname = user.name.split(' ')[1];
          }
          await connectToMongoDB().catch((error) => {
            throw new Error(error);
          });
          const userExists = await User.findOne({ email: user.email });
          if (userExists) {
            console.log('exisiting', userExists);
            user.role = userExists.role;
          }
        }
        return true;
      },
    },
    pages: {
      signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
  });
};

export const GET = handler;
export const POST = handler;

jjdhjfjdf
