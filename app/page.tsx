// pages/_app.tsx
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './styles/landingPage.module.css';

// import Public from '../components/Public';
// import Protected from '../components/Protected';
// import keycloak from '../keycloakConfig';

import Public from '@/components/Public';
import Link from 'next/link';
const MyApp: React.FC = () => {
  return (
    <>
      {' '}
      <div className={styles.background}>
        {/* when login in button is clicked, users are redirected to nextauth, then after authentication, back to the main dashboard */}
        <div className={styles.flexContainer}>
          <div>
            <h1 className={styles.title}>Tracker</h1>
            <div className={styles.buttonContainer}>
              <Link href="/login">
                <button className={styles.button} id={styles.signIn}>
                  Sign In
                </button>
              </Link>
              <Link href="/register">
                <button className={styles.button} id={styles.signUp}>
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
          {/* <Link href="/dashboard/redirect">Login</Link>
        <br />
        <Link href="/register">Register</Link> */}
        </div>
        {/* <p>This is the langing page of the tracker app </p> */}
      </div>
    </>
  );
};

export default MyApp;
