'use client';
import React, { SyntheticEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import GoogleLogo from '../register/assets/images/GoogleLogo';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import '../register/assets/styles/register.css';

export default function RegisterPage() {
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('Invalid username or password');

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const googleRegister = () => {
    setIsLoading(true);
    signIn('google', { callbackUrl: '/dashboard/redirect' });
  };

  async function registerUser(e: SyntheticEvent) {
    e.preventDefault();

    try {
      setIsError(false);
      setIsLoading(true);
      const { email, password } = userData;

      // using nextAuth 'signup' credential provider to register the new user
      const logInNewUser = await signIn('login', {
        email: email,
        password: password,
        redirect: false,
        // redirect: true,
        // callbackUrl: '/dashboard/redirect',
      });
      console.log(logInNewUser);
      if (logInNewUser?.status === 200) {
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
        <div className="example-logo-container">
          {/* we can put a logo here... */}
          <h2 className="example-title">Login</h2>
        </div>

        <div className="example-form-container">
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
            onSubmit={registerUser}
          >
            <div className="example-form-group">
              <label htmlFor="email" className="example-label">
                Email address
              </label>
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
                />
              </div>
            </div>

            <div className="example-form-group">
              <div className="example-form-row">
                <label htmlFor="password" className="example-label">
                  Password
                </label>
              </div>
              <div className="example-input-container">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={userData.password}
                  onChange={(e) => {
                    setUserData({ ...userData, password: e.target.value });
                  }}
                  required
                  className="example-input"
                />
              </div>
            </div>

            <div className="example-button-container">
              <button type="submit" className="example-button">
                Login
              </button>
            </div>
          </form>
          <div className="google-sign-up-container">
            <button className="google-sign-up-button" onClick={googleRegister}>
              <span className="google-logo-container">
                <GoogleLogo />
              </span>
              Continue with google
            </button>
          </div>
          <div className="dont-have-account-container">
            <div className="dont-have-account-text">Don't have an account?</div>
            <Link href="/register">
              <div className="dont-have-account-link">Register</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
