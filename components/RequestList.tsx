'use client'
import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import RequestItemTwo from "./RequestItem"

export default function requestList() {
    const [data, setData] = useState([])
    useEffect(() => {
      const getRequests = async () => {
        try {
          const response = await axios.get('http://localhost:5005/api/v1/requests');
          const responseBody = response.data;
          const allRequests = responseBody.data
          console.log(allRequests)
          setData(allRequests);
        } catch (err) {
          console.log('Error', err);
        }
      };
  
      getRequests();
    }, []);
  
  
  return (
    <div>
      {data.map((request) => {
        return <RequestItemTwo key={request._id} request = {request}/>
      })}
      
    </div>
  )
}
