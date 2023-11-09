// pages/_app.tsx
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';


// import Public from '../components/Public';
// import Protected from '../components/Protected';
// import keycloak from '../keycloakConfig';

import Public from '@/components/Public';
import Link from 'next/link';


const MyApp: React.FC = () => {

  return (
    <>
    <h1>this is the public page.</h1>
    {/* when login in button is clicked, users are redirected to nextauth, then after authentication, back to the main dashboard */}
    <Link href="/dashboard/redirect">Login</Link>
    <br />
    <Link href="/register">Register</Link>
    <br />
    <p>This is the langing page of the tracker app </p>
    </>
  );
};

export default MyApp
