"use client"
// TODO: move signout button to settings page (dashbaord/profile)
import React, { useEffect, useState } from 'react'
import {signOut, useSession} from "next-auth/react"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import styles from "../../../styles/homepage.module.css"
import useAxiosAuth from '@/library/hooks/useAxiosAuth'

interface User {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  role: string,
  accessToken: string,
  refreshToken: string,
  status: string,
}

export default function HomePage() {

  const router = useRouter()
  const {data: session} = useSession()
  const [user, setUser] = useState<User>()
  const axiosAuth = useAxiosAuth()
  const [clicked, setClicked] = useState(false)
  const [userStatus, setUserStatus] = useState("")

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
            console.log('this is the incoming data after creating a get request for homepage ',data)
            setUser(data)
            setUserStatus(data["status"])
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

  function clickStatus() {
    setClicked(true) 
    const timerId = setTimeout(() => setClicked(false), 5000);
  }

  async function setStatus(e:any) {
    if (e.target.id == "inOffice") {
      try {
        const response = await fetch(`http://localhost:5005/api/v1/interns/${session?.user.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `${localStorage.getItem("accessToken")!}`
            },
            body: JSON.stringify({"status": "Working in Office"})
        });
        const data = await response;
        setUserStatus("Working in Office")
        
      } catch (error) {
          console.log(error);
      }
    } else {
      try {
        const response = await fetch(`http://localhost:5005/api/v1/interns/${session?.user.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `${localStorage.getItem("accessToken")!}`
            },
            body: JSON.stringify({"status": "Working From Home"})
        });
        const data = await response;
        // console.log('status data ',data)
        setUserStatus("Working From Home")
      } catch (error) {
          console.log(error);
      }
    }

  }

  return (
    <>
    {session?.user ? (
      
      <>
      <div className={styles.centeredContainer}>
        <h1 className={styles.heading}>Good Morning {session?.user?.firstname.charAt(0).toUpperCase() + session?.user?.firstname.slice(1)}!</h1>
        <p className={styles.subheading}>It's nice to see you today.</p>
        {user && userStatus !== (undefined || "") ? (
          <div>
            <p className={styles.p}>Status</p>
            <h2 className={styles.checkIn}>Checked In:</h2>
            <Image
                  height={200}
                  width={200}
                  src={"/tick.svg"}
                  alt='Tick Icon'
                  onClick={clickStatus}
                />
            <h2>{userStatus}</h2>
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
                  onClick={clickStatus}
                />
              <p className={styles.p}>Working From Home</p>

            </div>
            ) : (
              <div className={styles.buttonContainer}>
                <button id='inOffice' className={styles.button} onClick={(e) => setStatus(e)}>In Office</button>
                <button id='wfh' className={styles.button} onClick={(e) => setStatus(e)}>Working From Home</button>
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
