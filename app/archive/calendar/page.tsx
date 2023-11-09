'use client'
import React from 'react'
import Navbar from '@/components/NavBar'
import BasicDateCalendar from "../../../components/Calendar"
export default function page() {
  return (
    <div>
        <Navbar/>
      <BasicDateCalendar/>
    </div>
  )
}
