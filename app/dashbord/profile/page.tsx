"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export default function Profile() {

    const {data: session} = useSession()
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function getProfile() {
            const response = await fetch("http://localhost:5005/api/v1/interns/", {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `${session?.user.accessToken}`
                }
            });
            const data = await response.json();
            console.log(data)
            setUsers(data)
        }

        getProfile()
    }, [])
  return (
    <div>Profile</div>
  )
}
