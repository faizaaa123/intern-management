"use client"
import React, { SyntheticEvent } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function RegisterPage() {

    const router = useRouter()
    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    })

    async function registerUser(e: SyntheticEvent) {
        e.preventDefault();

        console.log(JSON.stringify({userData}))

        try {

          const {firstname, lastname, email, password} = userData

          const signInNewUser = await signIn("signup", {
            firstname: `${firstname.charAt(0).toUpperCase()}${firstname.slice(1)}`, //converting to title case
            lastname: `${lastname.charAt(0).toUpperCase()}${lastname.slice(1)}`,
            email: email,
            password: password,
            redirect: true,
            callbackUrl: "/dashboard/redirect",
          });
          console.log(signInNewUser)
          // redirect to login page
          router.push("/dashboard/redirect")
          
        } catch (error) {
          console.log(error)
        }
    }
 
    return (
        <>
          <div className="example-container">
            <div className="example-logo-container">
                {/* we can put a logo here... */}
              <h2 className="example-title">
                Register your account
              </h2>
            </div>
    
            <div className="example-form-container">
              <form className="example-form" action="#" method="POST" onSubmit={registerUser}>
                <div className="example-form-group">
                    <label htmlFor="firstname" className="example-label">
                    Firstname
                    </label>
                    <div className="example-input-container">
                    <input
                        id="firstname"
                        name="firstname"
                        type="text"
                        value={userData.firstname}
                        onChange={(e) => {setUserData({...userData, firstname: e.target.value})}}
                        required
                        className="example-input"
                    />
                    </div>
                </div>

              <div className="example-form-group">
                  <label htmlFor="lastname" className="example-label">
                    Lastname
                  </label>
                  <div className="example-input-container">
                    <input
                      id="lastname"
                      name="lastname"
                      type="text"
                      value={userData.lastname}
                        onChange={(e) => {setUserData({...userData, lastname: e.target.value})}}
                      required
                      className="example-input"
                    />
                  </div>
                </div>

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
                        onChange={(e) => {setUserData({...userData, email: e.target.value})}}
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
                        onChange={(e) => {setUserData({...userData, password: e.target.value})}}
                      required
                      className="example-input"
                    />
                  </div>
                </div>
    
                <div className="example-button-container">
                  <button
                    type="submit"
                    className="example-button"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )
}
