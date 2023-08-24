"use client"

import React, { useEffect } from 'react'
import {signOut, useSession} from "next-auth/react"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function HomePage() {

  const router = useRouter()
  const {data: session} = useSession()

  useEffect(() => {
    function redirectUser() {
      if (session) {
        if (session.user.role === 'Supervisor') {
          router.push('/dashbord/supervisor/homepage');
        } else {
          return
        }
      }
    }

    redirectUser();
  }, [session, router]);

  console.log({session})

  function signOutUser() {
    signOut({
      redirect: false
    })
    router.push("/")
  }

  return (
    <>
    {session?.user ? (

      <>
      <h1>Hello! You Made it {session?.user?.firstname}!!</h1>
      <button onClick={signOutUser}>Sign out</button>
      <br />
      <Link href={"/dashbord/profile"}>My Profile</Link>
      <br />
      <Link href={"/dashbord/requests"}>Requests</Link>
      </>
    
    ) : (

      <>
      <p>Loading</p>
      </>
    )
    
    }  
    </>
  )
}
