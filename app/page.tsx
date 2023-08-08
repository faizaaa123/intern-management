"use client"
import Image from 'next/image'
import styles from './page.module.css'
import {useState} from "react";

export default function Home() {
  const [status, setStatus] = useState("");
  const handleClick = () => {
    // User swiped down, set status to 'working from home'
    setStatus('working from home');
  };

  const handleDoubleClick = () => {
    // User swiped up, set status to 'in office'
    setStatus('in office');
  };

  return (
    <div>
      <h1>Manual Check-in System</h1>
      <div
        style={{
          width: '200px',
          height: '200px',
          background: '#007bff',
          color: '#fff',
          fontSize: '20px',
          fontWeight: 'bold',
          cursor: 'pointer',
          userSelect: 'none',
          border: "1px black solid"
        }}
        onDoubleClick={handleDoubleClick}
        onClick={handleClick}
      >
        Tap to Check-in "Working from Home" or Double Tap to Check-in "In Office"
      </div>
      {status && <p>You are currently checked in as "{status}"</p>}
    </div>
  );
};