"use client"

import { axiosAuth } from '@/library/axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function InternRequests() {

    const {data: session} = useSession()
    const [requests, setRequests] = useState([])
    const [accessToken, setAccessToken] = useState("");
    const [user, setUser] = useState()
    const router = useRouter()

    useEffect(() => {

        setAccessToken(localStorage.getItem("accessToken")!)

        async function getRequests() {

            if(session) {
                
                try {
                    // can get one user like this - ensure to always add an "Authorization" property in header and send the token with it
                    // data received is not used here, but simply demonstrates how you would access backend API in the frontend
                    const response = await axiosAuth.get(`http://localhost:5005/api/v1/${session?.user.id}/requests`, {
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": `${accessToken}`
                        }
                    });
                    const {data} = await response.data;
                    console.log('this is the incoming data after creating a get request ',data)
                    setRequests(data)
                } catch (error) {
                    console.log(error);
                }
            }

        }

        getRequests()
    }, [session])
    
  return (
    <>
        <h1>Leave Requests</h1>
        <h2>Requested</h2>
        <br />

        {requests.map((request, index)=> {
          return  (
            <div key={index}>
              <h3>Reason: {request["reason"]}</h3>
              <h4>Status: {request["status"]}</h4>
            </div>
            
            )
        })}
        <button onClick={()=> router.back()}>Back</button>
    </>
  )
}
