'use client';
import React, { SyntheticEvent, useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { EyeSlash, Eye } from '../assets/images/EyeIcons';
import '../assets/styles/register.css';

export default function RolePage() {
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('There was an error confirming role');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedOption, setSelectedOption] = useState('option1');
  const { data: session } = useSession();
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'Intern',
  });

  useEffect(() => {
    if (session) {
      setUserData({
        ...userData,
        firstname: session?.user.firstname,
        lastname: session?.user.lastname || 'N/A',
        email: session?.user.email,
      });
    }
  }, [session]);

  async function UpdateRole(e: SyntheticEvent) {
    e.preventDefault();

    try {
      setIsError(false);
      setIsLoading(true);
      const { firstname, lastname, email, password, role } = userData;

      // using nextAuth 'signup' credential provider to register the new user
      const updateUserRole = await signIn('updateRole', {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        role: role,
        redirect: false,
        // redirect: true,
        // callbackUrl: '/dashboard/redirect',
      });
      console.log(updateUserRole);
      if (updateUserRole?.status === 200) {
        // redirect to login page
        router.push('/dashboard/redirect');
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="example-container">
        {isError && <div className="error">{error}</div>}
        {isLoading && (
          <div className="loader-container">
            <div className="loader-wrapper">
              <div className="loader"></div>
            </div>
          </div>
        )}
        <form
          className="example-form"
          action="#"
          method="POST"
          onSubmit={UpdateRole}
        >
          <div className="example-form-group">
            <div className="example-form-row">
              {/* <label htmlFor="password" className="example-label">
                  Password
                </label> */}
            </div>
            <div className="example-input-container">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={userData.password}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    password: e.target.value,
                  });
                }}
                required
                className="example-input"
                placeholder="Create a strong password"
              />
              <span
                className="eye-icon-container"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye /> : <EyeSlash />}
              </span>
            </div>
          </div>

          <div className="example-form-group checkbox-container">
            <div className="checkbox-intern-container">
              <div className="example-form-row">
                <label htmlFor="checkbox1" className="example-label">
                  Intern
                </label>
              </div>
              <div className="example-input-container">
                <input
                  id="checkbox1"
                  name="checkbox"
                  type="checkbox"
                  checked={selectedOption === 'option1'}
                  onChange={() => {
                    setSelectedOption('option1');
                    setUserData({ ...userData, role: 'Intern' });
                  }}
                  className="example-input"
                />
              </div>
            </div>
            <div className="checkbox-supervisor-container">
              <div className="example-form-row">
                <label htmlFor="checkbox2" className="example-label">
                  Supervisor
                </label>
              </div>
              <div className="example-input-container">
                <input
                  id="checkbox2"
                  name="checkbox"
                  type="checkbox"
                  checked={selectedOption === 'option2'}
                  onChange={() => {
                    setSelectedOption('option2');
                    setUserData({ ...userData, role: 'Supervisor' });
                  }}
                  className="example-input"
                />
              </div>
            </div>
          </div>

          <div className="example-button-container">
            <button
              type="submit"
              className="example-button sign-up-register-button"
            >
              Confirm
            </button>
          </div>
        </form>
        <button
          onClick={() => {
            signOut({
              redirect: false,
            });
            router.push('/');
          }}
        >
          Sign out
        </button>
      </div>
    </>
  );
}
