"use client"

import React, { useEffect } from 'react'
import {signOut, useSession} from "next-auth/react"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Redirct() {

  const router = useRouter()
  const {data: session} = useSession()

  useEffect(() => {
    function redirectUser() {
      if (session) {
        if (session.user.role === 'Supervisor') {
          router.push('/dashbord/supervisor/homepage');
        } else {
          router.push('/dashbord/intern/homepage');
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
