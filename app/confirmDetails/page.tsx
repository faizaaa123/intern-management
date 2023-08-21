"use client"
import React from 'react'
import Link from 'next/link'
import profileStyles from "../styles/confirmProfile.module.css"
import { MenuItem, Select } from '@mui/material'
import axios from "axios"
import {useEffect, useState} from "react"

const page = () => {
    const [data, setData] = useState([])
    useEffect(() => {
      const getSupervisors = async () => {
        try {
          const response = await axios.get('http://localhost:5005/api/v1/supervisors');
          const responseBody = response.data;
          const allSupervisors = responseBody.data
        //   console.log(allSupervisors)
          setData(allSupervisors);
        } catch (err) {
          console.log(err);
        }
      };
  
      getSupervisors();
    }, []);
  
  return (
    <div>
        <h1>Profile</h1>
        <p>Almost there</p>
        <form>
      <label htmlFor="fname">First name:</label><br />
      <input type="text" id="fname" name="fname" defaultValue="full name" readOnly /><br />
      <label htmlFor="pname">Last name:</label><br />
      <input type="text" id="lname" name="lname" defaultValue="preferred name" readOnly />
      <br/>
      <label htmlFor="role">Intern Role:</label><br />
      {/* <input type="text" id="role" name="intern role" defaultValue="Software engineer" readOnly /> */}
      <Select
              sx={{
                marginBottom:2,        
                width: 150,
                height: 25,
              }}
            >
                <MenuItem value={1}>Select Your Role
                 </MenuItem>
                 <MenuItem value={1}>Software Engineer
                 </MenuItem>
                 <MenuItem value={1}>Project Manager
                 </MenuItem>
            </Select>
      <br />

      <label htmlFor="email">Email address:</label>
      <br />

      <input type="text" id="email" name="Email address" placeholder='Email address' readOnly />
      <br />
      <div>
      <label htmlFor="supervisor">Supervisor:</label><br />
      <Select
              sx={{
             marginBottom:2,        
                width: 150,
                height: 25,
              }}
            >
            {
              data.map((supervisor) => {
                 return <MenuItem value={1}>{supervisor.firstname}
                 </MenuItem>
              })
  
            }
            </Select>
     
      </div>
    </form>
    <br/>
    <button><Link className = {profileStyles.buttonLink} href="../dashboard">Confirm Profile</Link></button>
       
        
        
      
    </div>
  )
}

export default page

