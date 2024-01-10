"use client"

import React, { useEffect } from 'react'
import {signOut, useSession} from "next-auth/react"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Redirct() {
  // this page checks the user's role and redirects them to the appriopriate route

  const router = useRouter()
  const {data: session} = useSession()

  // Function to refresh the page
  const refreshPage = () => {
    router.refresh();
  };

  useEffect(() => {
    // if reload takes more than five seconds, refresh the page
    const timer = setTimeout(refreshPage, 5000);
    
    function redirectUser() {
      if (session) {
        //store the access and refresh tokens
        localStorage.setItem("accessToken", session.user.accessToken)
        localStorage.setItem("refreshToken", session.user.refreshToken)

        if (session.user.role === 'Supervisor') {
          router.push('/dashboard/supervisor/homepage');
        } else {
          router.push('/dashboard/intern/homepage');
        }
      }
    }

    redirectUser();
    return () => clearTimeout(timer);
  }, [session, router]);

  return (
    <p>
      Loading...
    </p>
  )
}
