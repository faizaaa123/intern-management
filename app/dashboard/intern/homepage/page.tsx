"use client"

import React, { useEffect, useState } from 'react'
import {signOut, useSession} from "next-auth/react"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { axiosAuth } from '@/library/axios'
import Image from 'next/image'

export default function HomePage() {

  const router = useRouter()
  const {data: session} = useSession()
  const [user, setUser] = useState({})

  // console.log({session})

  useEffect(() => {

    async function getProfile() {

    if(session) {
        
        try {
            // can get one user like this - ensure to always add an "Authorization" property in header and send the token with it
            // data received is not used here, but simply demonstrates how you would access backend API in the frontend
            const response = await axiosAuth.get(`http://localhost:5005/api/v1/interns/${session?.user.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `${localStorage.getItem("accessToken")!}`
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

  function signOutUser() {
    signOut({
      redirect: false
    })
    router.push("/")
  }

  return (
    <>
    {session?.user ? (
      
      <>
      {console.log(user)}
      <h1>Good Morning {session?.user?.firstname}!!</h1>
      <p>It's nice to see you today.</p>
      {user == undefined ? (
        <div>
          <p>Status</p>
          <h2>Checked In:</h2>
          <h2>{user["status"]}</h2>
        </div>
      ) : (
        <div>
          <h2>Check In</h2>
          <p>In Office</p>
          <Image
            height={240}
            width={240}
            src={"/questionmark.svg"}
            alt='Question Mark Icon'
          />
          <p>Working From Home</p>
        </div>
      )}
      <button onClick={signOutUser}>Sign out</button>
      <br />
      <Link href={"/dashboard/profile"}>My Profile</Link>
      <br />
      <Link href={"/dashboard/intern/requests"}>Requests</Link>
      </>
    
    ) : (

      <>
      <p>Loading</p>
      </>
    )
    
    }  
    </>
  )
}
