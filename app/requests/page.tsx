'use client'
import React, { useState } from 'react'
import Navbar from '../../components/NavBar'
import Link from 'next/link'
import RequestList from '@/components/RequestList'
function page() {    

  return (
    <>
    <Navbar/>
    <h1>Here are all your requests</h1>
    <RequestList/>
    <button><Link href="../Test/SendLeaveRequest">Create a Request</Link></button>
    </>
  )
}

export default page
