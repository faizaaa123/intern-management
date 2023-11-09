"use client"

import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

export default function InternRequests() {

    const {data: session} = useSession()
    const [user, setUser] = useState()

    useEffect(() => {
        async function getProfile() {

            // retrieving intern leave requests using backend API
            const response = await fetch(`http://localhost:5005/api/v1/requests/${session?.user.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `${session?.user.accessToken}`
                }
            });
            const data = await response.json();
            console.log(data)
            setUser(data)
        }

        getProfile()
    }, [])
    
  return (
    <>
        <div>InternRequests</div>
    </>
  )
}
