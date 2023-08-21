'use client'
import React from 'react'
import Navbar from '@/components/NavBar'
import BasicDateCalendar from "../../components/Calendar"
import SuperVisorNavbar from '@/components/SupervisorNavbar'
export default function page() {
  return (
    <div>
        <SuperVisorNavbar/>
      <BasicDateCalendar/>
    </div>
  )
}
