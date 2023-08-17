import React from 'react'



export default function Public() {

  return (
    <>
    <h1>this is the public page.</h1>
    {/* when login in button is clicked, users are redirected to auth0, then after authentication, back to the main dashboard */}
    <a href="/api/auth/login">Login</a>
    </>
  )
}
