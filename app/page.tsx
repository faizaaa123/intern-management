import React from 'react'
import Link from 'next/link'
function page() {
  return (
    <div>
      <button><Link href='./signIn'>Sign in</Link></button>
      <button><Link href='./register'>Register</Link></button>

      
    </div>
  )
}

export default page
