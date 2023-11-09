import React from 'react'
// import Navbar from './NavBar'
import {useState, useEffect} from 'react'
import axios from 'axios'
export default function SinglePageIntern({internId}:{internId:any}) {
  const [displayIntern, setDisplayIntern] = useState({})
  useEffect(() => {
    const getIntern = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/api/v1/interns/${internId}`);
        const responseBody = response.data;
        const intern = responseBody.data
        if (!intern) {
            console.log('Intern not found - error 404')
        }
        console.log(intern)
        setDisplayIntern(intern);
      } catch (err) {
        console.log('Error', err);
      }
    };

    getIntern();
  }, []);


  return (
    <div>
        {/* <Navbar/> */}
        <h1>Intern Details</h1>
        <h2>First name : {displayIntern.firstname}</h2>
        <p>Last name: {displayIntern.lastname}</p>
        <p>Email: {displayIntern.email}</p>
        <p>Role: {displayIntern.internRole}</p>
        <p>Supervisor: {displayIntern.supervisor? `${displayIntern.supervisor}`: 'Not assigned to a supervisor'}</p>


      
    </div>
  )
}
