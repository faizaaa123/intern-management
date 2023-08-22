// pages/_app.tsx
import AuthProviderWithHistory from "../auth0provider";
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';


// import Public from '../components/Public';
// import Protected from '../components/Protected';
// import keycloak from '../keycloakConfig';

import Public from '@/components/Public';


const MyApp: React.FC = () => {

  return (

     <Public/>

  );
};

export default MyApp;
