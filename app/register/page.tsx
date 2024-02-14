'use client';
import React, { SyntheticEvent, useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import './assets/styles/register.css';
import TrackrLogo from './assets/images/TrackrLogo';
import GoogleLogo from './assets/images/GoogleLogo';
import { EyeSlash, Eye } from './assets/images/EyeIcons';
import SigninNewFeatures from '../../components/SigninNewFeatures';
import Link from 'next/link';
import Typist from './assets/scripts/Typist';

export default function RegisterPage() {
  const [hdata, setHdata] = useState(false);

  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedOption, setSelectedOption] = useState('option1');

  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'Intern',
  });

  const googleRegister = () => {
    setIsLoading(true);
    signIn('google', {
      redirect: false,
      callbackUrl: '/register/role',
      role: 'custom',
    });
  };

  async function registerUser(e: SyntheticEvent) {
    e.preventDefault();

    try {
      setIsError(false);
      setIsLoading(true);
      const { firstname, lastname, email, password, role } = userData;

      // using nextAuth 'signup' credential provider to register the new user
      const signInNewUser = await signIn('signup', {
        firstname: `${firstname.charAt(0).toUpperCase()}${firstname.slice(1)}`, //converting to title case
        lastname: `${lastname.charAt(0).toUpperCase()}${lastname.slice(1)}`,
        email: email,
        password: password,
        role: role,
        redirect: false,
        // redirect: true,
        // callbackUrl: '/dashboard/redirect',
      });

      console.log(signInNewUser);
      if (signInNewUser?.status === 200) {
        // redirect to login page
        router.push('/login');
      } else {
        setIsLoading(false);
        setIsError(true);
        setError(
          signInNewUser?.error
            ? signInNewUser?.error.split(':')[0]
            : 'There was an error signing in'
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="sign-up-container">
        <div className="sign-up-grid-container">
          <div className="example-container">
            <div className="trackr-logo">
              <TrackrLogo />
            </div>
            <div className="example-main-title-container">
              <h2 className="example-title sign-up-main-title">
                Sign up to monitor interns
                <span className="sign-up-main-title-span">
                  <span className="wrap">
                    <Typist
                      strings={[
                        'upcoming events',
                        'attendance report',
                        'tasks',
                      ]}
                      delay={2000}
                    />
                  </span>
                </span>
              </h2>
            </div>
            {isError && <div className="error">{error}</div>}
            <div className="example-form-container">
              {isLoading && (
                <div className="loader-container">
                  <div className="loader-wrapper">
                    <div className="loader"></div>
                  </div>
                </div>
              )}
              <div className="sign-up-form-container">
                <h3 className="sign-up-form-heading">Enter your details</h3>
                <form
                  className="example-form"
                  action="#"
                  method="POST"
                  onSubmit={registerUser}
                >
                  <div className="example-form-group">
                    {/* <label htmlFor="firstname" className="example-label">
                Firstname
              </label> */}
                    <div className="example-input-container">
                      <input
                        id="firstname"
                        name="firstname"
                        type="text"
                        value={userData.firstname}
                        onChange={(e) => {
                          setUserData({
                            ...userData,
                            firstname: e.target.value,
                          });
                        }}
                        required
                        className="example-input"
                        placeholder="First name"
                      />
                    </div>
                  </div>

                  <div className="example-form-group">
                    {/* <label htmlFor="lastname" className="example-label">
                Lastname
              </label> */}
                    <div className="example-input-container">
                      <input
                        id="lastname"
                        name="lastname"
                        type="text"
                        value={userData.lastname}
                        onChange={(e) => {
                          setUserData({
                            ...userData,
                            lastname: e.target.value,
                          });
                        }}
                        required
                        className="example-input"
                        placeholder="Last name"
                      />
                    </div>
                  </div>

                  <div className="example-form-group">
                    {/* <label htmlFor="email" className="example-label">
                Email address
              </label> */}
                    <div className="example-input-container">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={userData.email}
                        onChange={(e) => {
                          setUserData({ ...userData, email: e.target.value });
                        }}
                        required
                        className="example-input"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

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
                      Register
                    </button>
                  </div>
                </form>
              </div>
              <div className="seperator-container">
                <span className="seperator-line"></span>
                <span className="seperator-text">OR</span>
                <span className="seperator-line"></span>
              </div>
              <div className="google-sign-up-container">
                <button
                  className="google-sign-up-button"
                  onClick={googleRegister}
                >
                  <span className="google-logo-container">
                    <GoogleLogo />
                  </span>
                  Continue with google
                </button>
              </div>
              <div className="alredy-have-account-container">
                <div className="alredy-have-account-text">
                  Already have an account?
                </div>
                <Link href="/login">
                  <div className="alredy-have-account-link">Log In</div>
                </Link>
              </div>
            </div>
          </div>
          <SigninNewFeatures />
        </div>
      </div>
    </>
  );
}
