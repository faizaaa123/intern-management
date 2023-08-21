'use client'
import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import PersonIcon from '@mui/icons-material/Person';
import profileStyles from '../styles/profile.module.css'
import Navbar from '../../components/NavBar';

const page = () => {
  const [data, setData] = useState([])
  const [displayProfile, setDisplayProfile] = useState(true);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setDisplayProfile((prevDisplayProfile) => !prevDisplayProfile);
  };

  useEffect(() => {
      const getIntern = async () => {
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
  
      getIntern();
    }, []);
  
  return (
        <div>
        <Navbar/>
         {displayProfile && <div className={profileStyles.profile}>
        <PersonIcon sx={{ fontSize: 300 }}/>
        <h1>Your profile</h1>
        <p className={profileStyles.paragraph}>First name: {data.firstname}</p>
        <p className={profileStyles.paragraph}>Last name: {data.lastname}</p>
        <p className={profileStyles.paragraph}>Email: {data.email}</p>
        <p className={profileStyles.paragraph}>Password: *******</p>
        <p className={profileStyles.paragraph}>Role: {data.role}</p>
        <p className={profileStyles.paragraph}>Supervisor: {data.supervisor? `${data.supervisor}`: 'Not assigned to a supervisor'}</p>
        <button onClick={handleClick}>Update Profile</button>
        </div>
        }
    
  
    </div>
  )
}

export default page
