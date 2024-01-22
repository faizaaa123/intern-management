'use client'
import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import PersonIcon from '@mui/icons-material/Person';
import profileStyles from '../styles/profile.module.css'
import SuperVisorNavbar from '@/components/SupervisorNavbar';
import { useSession } from 'next-auth/react';
// import Supervisor from '@/server/models/supervisorModel';

const page = () => {
  const [data, setData] = useState([])
  const [displayProfile, setDisplayProfile] = useState(true);
  const {data: session} = useSession();
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   setDisplayProfile((prevDisplayProfile) => !prevDisplayProfile);
  // };

  useEffect(() => {
    // can use session data to receive user's profile instead of making a request to backend
      const getSupervisor = async () => {
        try {
          const response = await axios.get('http://localhost:5005/api/v1/supervisors/64da740689d3effcdd2d48e9');
          const responseBody = response.data;
          const supervisor = responseBody.data
          console.log(supervisor)
          setData(supervisor);
        } catch (err) {
          console.log('Error', err);
        }
      };

      getSupervisor();
    }, []); 
  
  return (
        <div>
        <SuperVisorNavbar/>
         {displayProfile && <div className={profileStyles.profile}>
        <PersonIcon sx={{ fontSize: 300 }}/>
        <h1>Your profile</h1>
        {/* below is an example of using session data */}
        <p className={profileStyles.paragraph}>First name: {session?.user.firstname}</p>

        <p className={profileStyles.paragraph}>Last name: {data.lastname}</p>
        <p className={profileStyles.paragraph}>Email: {data.email}</p>
        <p className={profileStyles.paragraph}>Password: *******</p>
        <p className={profileStyles.paragraph}>Role: {data.role}</p>
        {/* <button onClick={handleClick}>Update Profile</button> */}
        </div>
        }
    
  
    </div>
  )
}

export default page
