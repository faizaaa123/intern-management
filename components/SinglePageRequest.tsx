import React from 'react'
import Navbar from './NavBar'
import {useState, useEffect} from 'react'
import axios from 'axios'
export default function singlePageRequest({requestId}:{requestId:any}) {
  const [displayRequest, setDisplayRequest] = useState({})
  useEffect(() => {
    const getRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/api/v1/requests/${requestId}`);
        const responseBody = response.data;
        const request = responseBody.data
        console.log(request)
        setDisplayRequest(request);
      } catch (err) {
        console.log('Error', err);
      }
    };

    getRequests();
  }, []);


  return (
    <div>
        <Navbar/>
        <h1>Your Request</h1>
        <h2>Status: {displayRequest.status}</h2>
        <p>Reason - {displayRequest.reason}</p>
        <p>Start Date - {displayRequest.start_date}</p>
        <p>End Date - {displayRequest.end_date}</p>
        <p>Comments - {displayRequest.additional_notes}</p>


      
    </div>
  )
}
