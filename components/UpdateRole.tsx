"use client"
import React, { useState } from 'react';

const UpdateInternRole = ({ internId }) => {
  const [internRole, setInternRole] = useState('');

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5005/api/v1/interns/${internId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ internRole }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Intern role updated successfully:', data.data);
      } else {
        console.error('Error updating intern role:', data.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <h2>Update Intern Role</h2>
      <select value={internRole} onChange={(e) => setInternRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="project manager">Project Manager</option>
        <option value="software engineer">Software Engineer</option>
      </select>
      <button onClick={handleUpdate}>Update Role</button>
    </div>
  );
};

export default UpdateInternRole;
