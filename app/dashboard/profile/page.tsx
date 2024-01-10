"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import User from '@/server/models/userInterface'
import Link from 'next/link'
import styles from "../../styles/profile.module.css"
import useAxiosAuth from '@/library/hooks/useAxiosAuth'
// import { axiosAuth } from '@/library/axios'

export default function Profile() {

    const {data: session} = useSession()
    const [user, setUser] = useState({})
    const axiosAuth = useAxiosAuth()
    const [accessToken, setAccessToken] = useState("");

    // console.log(session)

    useEffect(() => {

        setAccessToken(localStorage.getItem("accessToken")!)

        async function getProfile() {

            if(session) {
                
                try {
                    // can get one user like this - ensure to always add an "Authorization" property in header and send the token with it
                    // data received is not used here, but simply demonstrates how you would access backend API in the frontend
                    const response = await axiosAuth.get(`http://localhost:5005/api/v1/interns/${session?.user.id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": `${accessToken}`
                        }
                    });
                    const {data} = await response.data;
                    console.log('this is the incoming data after creating a get request ',data)
                    setUser(data)
                } catch (error) {
                    console.log(error);
                }
            }

        }

        getProfile()
    }, [session])

  return (
    <>
    <div>
        <div className={styles.profilePic}>
            <h1>{`${session?.user.firstname[0]}${session?.user.lastname[0]}`}</h1>
        </div>
    </div>
    <h1>My Profile</h1>
    <br/>
    <h2>Firstname: {session?.user.firstname}</h2>
    <h2>Lastname: {session?.user.lastname}</h2>
    <h2>Email: {session?.user.email}</h2>
    <br />
    <Link href={"/dashboard/intern/homepage"}>Back</Link>
    </>
  )
}
