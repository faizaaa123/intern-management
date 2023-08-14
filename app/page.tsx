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

const MyApp: React.FC = () => {
  const isAuthenticated = useAuth0()
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [token, setToken] = useState<string | undefined>("");

  // useEffect(() => {
  //   keycloak.init({ onLoad: 'login-required' }).then((res) => {
  //     setIsAuthenticated(res);
  //     setToken(keycloak?.token);
  //     })
  //     .catch((error) => {
  //       console.error('Keycloak Initialization Error:', error);
  //     });
  // }, []);
  //console.log(token);

  return (
    <div>
    <AuthProviderWithHistory>
    {isAuthenticated ? <Protected/> : <Public />}
    </AuthProviderWithHistory>
    </div>
  );
};

export default MyApp;
