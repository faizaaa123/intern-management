"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import User from '@/server/models/userInterface'
import Link from 'next/link'
import useAxiosAuth from '@/library/hooks/useAxiosAuth'

export default function Profile() {

    const {data: session} = useSession()
    const [user, setUser] = useState({})
    const axiosAuth = useAxiosAuth()

    console.log(session)

    useEffect(() => {
        async function getProfile() {

            try {
                
                
                // can get one user like this - ensure to always add an "Authorization" property in header and send the token with it
                // data received is not used here, but simply demonstrates how you would access backend API in the frontend
                const response = await axiosAuth.get(`http://localhost:5005/api/v1/interns/${session?.user.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `${session?.user.accessToken}`
                    }
                });
                const {data} = await response.data;
                console.log('this is the incoming data after creating a get request ',data)
                setUser(data)
            } catch (error) {
                console.log(error);
            }
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
    <h2>Status: </h2>
    <br />
    <Link href={"/dashboard/intern/homepage"}>Back</Link>
    </>
  )
}
