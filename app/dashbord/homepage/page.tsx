"use client"

import React from 'react'
import {signOut, useSession} from "next-auth/react"
import { useRouter } from 'next/navigation'

export default function HomePage() {

  const router = useRouter()
  const {data: session} = useSession()

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
