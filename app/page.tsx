"use client"
import Image from 'next/image'
import styles from './page.module.css'
import {useState} from "react";

export default function Home() {
  const [status, setStatus] = useState("");
  const handlePointerDown = () => {
    // User swiped down, set status to 'working from home'
    setStatus('working from home');
  };

  const handlePointerUp = () => {
    // User swiped up, set status to 'in office'
    setStatus('in office');
  };

  return (
    <div>
      <h1>Manual Check-in System</h1>
      <div
        style={{
          width: '100px',
          height: '100px',
          background: '#007bff',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '20px',
          fontWeight: 'bold',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        Click and hold to Check-in "Working from Home" or Release to Check-in "In Office"
      </div>
      {status && <p>You are currently checked in as "{status}"</p>}
    </div>
  );
};