"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import User from '@/server/models/userInterface'
import Link from 'next/link'

export default function Profile() {

    const {data: session} = useSession()
    const [user, setUser] = useState()

    console.log(session)

    useEffect(() => {
        async function getProfile() {
            const response = await fetch(`http://localhost:5005/api/v1/interns/${session?.user.id}`, {
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
    <h1>My Profile</h1>
    <br/>
    <h2>Firstname: {session?.user.firstname}</h2>
    <h2>Lastname: {session?.user.lastname}</h2>
    <h2>Email: {session?.user.email}</h2>
    <br />
    <Link href={"/dashbord/intern/homepage"}>Back</Link>
    </>
  )
}
