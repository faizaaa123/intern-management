'use client';

import React, { useEffect, useState } from 'react';
import styles from '../app/styles/navBar.module.css';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';

const Navigation = () => {
  const { data: session } = useSession();
  const [role, setRole] = useState('');

  useEffect(() => {
    if (session) {
      setRole(session?.user.role!?.toLowerCase());
    }
  }, [session]);

  // console.log(role);
  return (
    <>
      {session && (
        <div>
          <nav className={styles.border}>
            <Link className={styles.link} href={`/dashboard/${role}/homepage`}>
              Home
            </Link>
            <Link className={styles.link} href={'/'}>
              Calendar
            </Link>
            <Link className={styles.link} href={`/dashboard/${role}/requests`}>
              Requests
            </Link>
            <Link className={styles.link} href={`/dashboard/profile`}>
              Settings
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navigation;
