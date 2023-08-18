"use client"
import React, { useState, useEffect } from 'react';

const UpdateUserProfile = ({ internId }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [internRole, setInternRole] = useState('');

  useEffect(() => {
    // Fetch intern's existing information
    const fetchInternInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5005/api/v1/interns/${internId}`);
        const data = await response.json();

        if (response.ok) {
          const { firstname, lastname, email, internRole } = data.data;
          setFirstname(firstname);
          setLastname(lastname);
          setEmail(email);
          setInternRole(internRole);
        } else {
          console.error('Error fetching intern information:', data.message);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchInternInfo();
  }, [internId]);

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(`http://localhost:5005/api/v1/interns/${internId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstname, lastname, email, internRole }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('User profile updated successfully:', data.data);
      } else {
        console.error('Error updating user profile:', data.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <h2>Update User Profile</h2>
      <label>First Name:</label>
      <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
      <label>Last Name:</label>
      <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Intern Role:</label>
      <select value={internRole} onChange={(e) => setInternRole(e.target.value)}>
        <option value="project manager">Project Manager</option>
        <option value="software engineer">Software Engineer</option>
      </select>
      <button onClick={handleUpdateProfile}>Update Profile</button>
    </div>
  );
};

export default UpdateUserProfile;
