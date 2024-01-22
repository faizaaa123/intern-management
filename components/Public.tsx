import Link from 'next/link'
import React from 'react'



export default function Public() {

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
  )
}
