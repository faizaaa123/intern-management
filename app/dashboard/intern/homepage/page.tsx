"use client"

import React, { useEffect } from 'react'
import {signOut, useSession} from "next-auth/react"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function HomePage() {

  const router = useRouter()
  const {data: session} = useSession()

  console.log({session})

  useEffect(() => {
    if(session) {
      localStorage.setItem("accessToken", session.user.accessToken)
      localStorage.setItem("refreshToken", session.user.refreshToken)
  }
  }, [])

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
      <Link href={"/dashboard/profile"}>My Profile</Link>
      <br />
      <Link href={"/dashboard/intern/requests"}>Requests</Link>
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
