'use client'
import React, { useState } from 'react'
import Link from 'next/link' 
import InternList from '../../components/InternList'
import SuperVisorNavbar from '@/components/SupervisorNavbar'
export default function page() {
  return (
    <div>
          <SuperVisorNavbar/>
        <h1>Here are all your interns</h1>
        <InternList/>
      
    </div>
  )
}
