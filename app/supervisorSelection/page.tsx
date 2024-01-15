'use client'

import useAxiosAuth from '@/library/hooks/useAxiosAuth'
import { User } from 'next-auth'
import { useSession } from 'next-auth/react'
// import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function SupervisorSelection() {

    // const router = useRouter()
    const {data: session} = useSession()
    const [user, setUser] = useState<User>()
    const axiosAuth = useAxiosAuth()
    const [clicked, setClicked] = useState(false)
    const [userStatus, setUserStatus] = useState("")
  
    // console.log({session})
  
    useEffect(() => {
  
      async function getProfile() {
  
      if(session) {

        console.log(localStorage.getItem("accessToken"))
          
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
              setUserStatus(data["status"])
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
        <h1></h1>
    </div>
    </>
  )
}
