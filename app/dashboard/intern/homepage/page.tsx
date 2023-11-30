"use client"

import React, { useEffect, useState } from 'react'
import {signOut, useSession} from "next-auth/react"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { axiosAuth } from '@/library/axios'
import Image from 'next/image'
import styles from "../../../styles/homepage.module.css"

export default function HomePage() {

  const router = useRouter()
  const {data: session} = useSession()
  const [user, setUser] = useState({})
  const [clicked, setClicked] = useState(false)

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

  function setStatus() {
    setClicked(true) 
    const timerId = setTimeout(() => setClicked(false), 5000);
  }

  return (
    <>
    {session?.user ? (
      
      <>
      <div className={styles.centeredContainer}>
        <h1 className={styles.heading}>Good Morning {session?.user?.firstname.charAt(0).toUpperCase() + session?.user?.firstname.slice(1)}!</h1>
        <p className={styles.subheading}>It's nice to see you today.</p>
        {user == undefined ? (
          <div>
            <p className={styles.p}>Status</p>
            <h2 className={styles.checkIn}>Checked In:</h2>
            <h2>{user["status"]}</h2>
          </div>
        ) : (
          <div>
            <h2 className={styles.checkIn}>Check In:</h2>
            {!clicked ? ( 
            <div>
              <p className={styles.p}>In Office</p>
                <Image
                  height={200}
                  width={200}
                  src={"/questionmark.svg"}
                  alt='Question Mark Icon'
                  onClick={setStatus}
                />
              <p className={styles.p}>Working From Home</p>

            </div>
            ) : (
              <div className={styles.buttonContainer}>
                <button className={styles.button}>In Office</button>
                <button className={styles.button}>Working From Home</button>
              </div>
            )
            
            }

          </div>
        )}

      </div>

      <button onClick={signOutUser}>Sign out</button>
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
