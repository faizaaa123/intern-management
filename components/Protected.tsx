import React, { useEffect, useState } from 'react'


export default function Protected() {

    const [profile, setProfile] = useState();

    useEffect(()=> {
        const getProfile = async () => {

            try {
                const response = await fetch("http://localhost:5000/profile");
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
