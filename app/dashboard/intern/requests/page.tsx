"use client"

import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

export default function InternRequests() {

    const {data: session} = useSession()
    const [requests, setRequests] = useState()
    
  return (
    <>
        <div>InternRequests</div>
    </>
  )
}
