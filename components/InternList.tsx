'use client'
import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import Intern from "./Intern"

export default function requestList() {
    const [data, setData] = useState([])
    useEffect(() => {
      const getRequests = async () => {
        try {
          const response = await axios.get('http://localhost:5005/api/v1/interns');
          const responseBody = response.data;
          const allInterns = responseBody.data
          console.log(allInterns)
          setData(allInterns);
        } catch (err) {
          console.log('Error', err);
        }
      };
  
      getRequests();
    }, []);
  
  
  return (
    <div>
      {data.map((intern) => {
        return <Intern key={intern._id} intern = {intern}/>
      })}
      
    </div>
  )
}
