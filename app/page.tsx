"use client"
// pages/_app.tsx

import { useEffect, useState } from 'react';
import keycloak from '../KeycloakConfig';
import Public from '../components/Public';
import Protected from '../components/Protected';

const MyApp: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    keycloak.init({ onLoad: 'login-required' }).then((res) => {
      setIsAuthenticated(res);
      })
      .catch((error) => {
        console.error('Keycloak Initialization Error:', error);
      });
  }, []);

  return (
    <div>
      {isAuthenticated ? <Protected /> : <Public />}
    </div>
  );
};

export default MyApp;
