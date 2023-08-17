"use client"
// pages/_app.tsx
import AuthProviderWithHistory from "../auth0provider";
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';


// import Public from '../components/Public';
// import Protected from '../components/Protected';
// import keycloak from '../keycloakConfig';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Public from '@/components/Public';
import Protected from "@/components/Protected";
import AuthProviderHistory from "../auth0provider"

const MyApp: React.FC = () => {
  const isAuthenticated = useAuth0()

  return (
    // <UserProvider>
    <AuthProviderHistory>
       <Public/>
    </AuthProviderHistory>
     
    // </UserProvider>
  );
};

export default MyApp;
