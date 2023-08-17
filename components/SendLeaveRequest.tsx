"use client"
import React, { useState } from 'react';

const SendLeaveRequest = ({ internId }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [additonal, setAdditonal] = useState('')

  const handleSendRequest = async () => {
    try {
      const response = await fetch('http://localhost:5005/api/v1/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: internId, start_date: startDate, end_date: endDate, reason,additional_notes: additonal }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Leave request sent successfully:', data.data);
      } else {
        console.error('Error sending leave request:', data.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <h2>Send Leave Request</h2>
      <label>Start Date:</label>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <label>End Date:</label>
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <label>Reason:</label>
      <textarea value={reason} onChange={(e) => setReason(e.target.value)} />
      <label>Additional Notes:</label>
      <textarea value={additonal} onChange={(e) => setAdditonal(e.target.value)} />
      <button onClick={handleSendRequest}>Send Request</button>
    </div>
  );
};

export default SendLeaveRequest;

