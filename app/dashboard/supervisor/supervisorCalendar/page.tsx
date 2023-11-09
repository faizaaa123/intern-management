'use client'
import React from 'react'
import Navbar from '@/components/NavBar'
import BasicDateCalendar from "../../../../components/Calendar"
import SuperVisorNavbar from '@/components/SupervisorNavbar'
export default function page() {
  // this is an extra feature - only implement when all the other features have been completed
  return (
    <div>
        <SuperVisorNavbar/>
      <BasicDateCalendar/>
    </div>
  )
}
