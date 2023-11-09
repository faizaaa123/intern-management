"use client"

import React, { useEffect } from 'react'
import {signOut, useSession} from "next-auth/react"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Redirct() {
  // this page checks the user's role and redirects them to the appriopriate route

  const router = useRouter()
  const {data: session} = useSession()

  useEffect(() => {
    function redirectUser() {
      if (session) {
        if (session.user.role === 'Supervisor') {
          router.push('/dashboard/supervisor/homepage');
        } else {
          router.push('/dashboard/intern/homepage');
        }
      }
    }

    redirectUser();
  }, [session, router]);

  return (
    <p>
      Loading...
    </p>
  )
}
