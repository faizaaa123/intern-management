"use client"

import React from 'react'
import {signOut} from "next-auth/react"
import { useRouter } from 'next/navigation'

export default function HomePage() {

  const router = useRouter()

  function signOutUser() {
    signOut({
      redirect: false
    })
    router.push("/")
  }

  return (
    <>
    <h1>Hello! You Made it!!</h1>
    <button onClick={signOutUser}>Sign out</button>
    </>
  )
}
