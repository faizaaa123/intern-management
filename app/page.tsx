"use client"
// pages/_app.tsx

import { useEffect, useState } from 'react';
import keycloak from '../keycloakConfig';
import Public from '../components/Public';
import Protected from '../components/Protected';

const MyApp: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    keycloak.init({ onLoad: 'login-required' }).then((res) => {
      setIsAuthenticated(res);
    });
  }, []);

  return (
    <div>
      {isAuthenticated ? <Protected /> : <Public />}
    </div>
  );
};

export default MyApp;
