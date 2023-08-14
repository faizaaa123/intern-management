import React, { useEffect, useState } from 'react'

//once user is authenticated, their profile is fetched while token is sent in headers to be varified.
export default function Protected({token}: {token: string | undefined}) {

    const [profile, setProfile] = useState();

    useEffect(()=> {

    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

        const getProfile = async () => {

            try {
                const response = await fetch("http://localhost:5000/profile", config);
                const data = response.json()
                console.log(data); 
                setProfile(await data);  
            } catch (error) {
                console.log(error);
            }
            
        }
        getProfile()
    }, [])


  return (
    <>
    <h1>Protected</h1>
    {profile && profile.map((item: string, i: number)=> <h2 key = {i}>{item}</h2>)}
    </>
    

  )
}
