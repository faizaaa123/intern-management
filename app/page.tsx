"use client"
// pages/_app.tsx

import { useEffect, useState } from 'react';
import keycloak from '../keycloakConfig';
import Public from '../components/Public';
import Protected from '../components/Protected';

const MyApp: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | undefined>("");

  useEffect(() => {
    keycloak.init({ onLoad: 'login-required' }).then((res) => {
      setIsAuthenticated(res);
      setToken(keycloak?.token);
      })
      .catch((error) => {
        console.error('Keycloak Initialization Error:', error);
      });
  }, []);
  //console.log(token);

  return (
    <div>
      {isAuthenticated ? <Protected token = {token}/> : <Public />}
    </div>
  );
};

export default MyApp;
