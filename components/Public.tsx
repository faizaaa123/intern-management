import Link from 'next/link'
import React from 'react'



export default function Public() {

  return (
    <>
    <h1>this is the public page.</h1>
    {/* when login in button is clicked, users are redirected to auth0, then after authentication, back to the main dashboard */}
    <Link href="/dashbord/redirect">Login</Link>
    <br />
    <Link href="/register">Register</Link>
    <br />
    <p>ps: I just realised I spelt "dashboard" wrong in the file structure (I missed the a), but there are too many imports and files that are dependent on the wrong spelling, I cannot be asked to change it :P </p>
    </>
  )
}
