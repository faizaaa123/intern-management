"use client"
import React from 'react'
import Navbar from '../../../components/NavBar'
import axios from "axios"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import dashBoardStyles from '../styles/dashBoard.module.css'
//TODO: Display all requests here
const page = () => {
    // const [data, setData] = useState([])
    // useEffect(() => {
    //   const getSupervisors = async () => {
    //     try {
    //       const response = await axios.get('http://localhost:5005/api/v1/supervisors');
    //       const responseBody = response.data;
    //       const allSupervisors = responseBody.data
    //     //   console.log(allSupervisors)
    //       setData(allSupervisors);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };
  
    //   getSupervisors();
    // }, []);
  
  const [data, setData] = useState([])
  useEffect(() => {
    const getRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5005/api/v1/interns/64df33f00e4ba5f33d9ac1e9');
        const responseBody = response.data;
        const intern = responseBody.data
        console.log(intern)
        setData(intern);
      } catch (err) {
        console.log('Error', err);
      }
    };

    getRequests();
  }, []);

  return (
    <div>
      <Navbar/>
        <div className={dashBoardStyles.dashBoard}>
        <h1>Hello There</h1>
        <p>It's nice to see you today</p>
        <h2>Status: {data.status? `${data.status}`: 'Working In Office'}</h2>
        <h2>Events</h2>
        <p>You have no upcoming events</p>
        <button className={dashBoardStyles.buttonLink}><Link href='../requests'>View Requests</Link></button>
        </div>


      
    </div>
  )
}

export default page
