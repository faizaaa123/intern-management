"use client"
import React, { Component } from 'react'
import {Select, MenuItem} from "@mui/material";
import axios from "axios"
import {useEffect, useState} from "react"
import Link from 'next/link';
import Supervisor from "../../server/models/supervisorModel"
export default function page() {

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
              <h1>Hi Test.</h1>
              <p>A few more things before you're good to go.</p>
              <br/>
              <h2>Select your Supervisor</h2>
              {/*TODO create toggle dropwdown with active list of supervisors */}
              <Select
              sx={{
             marginBottom:2,        
                width: 250,
                height: 50,
              }}
            >
            {
              data.map((supervisor) => {
                 return <MenuItem value={1}>{supervisor.firstname}
                 </MenuItem>
              })
  
            }
            </Select>
            <br/>
            <h2>Select your Role</h2>
            <Select
              sx={{
                marginBottom:2,        
                width: 250,
                height: 50,
              }}
            >
                <MenuItem value={1}>Select Your Role
                 </MenuItem>
                 <MenuItem value={1}>Software Engineer
                 </MenuItem>
                 <MenuItem value={1}>Project Manager
                 </MenuItem>
            </Select>
            <br/>
      
            <button><Link href = "./editProfile">Next</Link></button>
            </div>
          )
        
      }
  
  