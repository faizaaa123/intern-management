'use client'

import axios from "axios"
import { signJwtRefreshToken } from "../jwt";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import {signOut, useSession} from "next-auth/react"
import router from "next/router";


export const useRefreshToken = () => {

    const refreshToken = async () => {

        // checks whether the refresh token is about to expire/expired. 
        // const token = isAboutToExpire(localStorage.getItem("refreshToken")!)
        
        // // If so, generate a new one
        // if(token?.expired) {
        //     const newRefreshToken = signJwtRefreshToken(token.decoded!)
        //     localStorage.setItem("refreshToken", newRefreshToken)
        // }

        const res = await axios.post("/api/v1/refresh", {
            refreshToken: localStorage.getItem("refreshToken"),
        })

        localStorage.setItem("accessToken", res.data.accessToken)
    }

    return refreshToken
}

function isAboutToExpire(refreshToken: string) {
    try {
        // Decode the refresh token
        const secret_key = process.env.NEXT_PUBLIC_KEY as Secret;
        console.log(secret_key)
        const decodedToken = jwt.verify(refreshToken, secret_key) as JwtPayload;
        console.log("this is the decoded token ",decodedToken)
        if (decodedToken && decodedToken.exp) {

            // convert refresh token and current timeinto milli sec
            const expirationTimeInMillis = decodedToken.exp * 1000;
            const currentTimeInMillis = new Date().getTime();

            // Calculate the remaining time until expiration
            const remainingTimeInMillis = expirationTimeInMillis - currentTimeInMillis;
            // Calculate the remaining time in days
            const remainingDays = remainingTimeInMillis / (1000 * 60 * 60 * 24);

            // Check if the remaining time is three days or less
            return {"expired": remainingDays <= 3, "decoded": decodedToken};
        } else {
            // If the decoded token doesn't have an expiration time, consider it expired
            return {"expired": true, "decoded": decodedToken};
        }
    } catch (error) {
        console.error("Error decoding refresh token:", error);

        // ideally, if error is thrown and cannot decode, force user to sign in again.
        () => {
            signOut({
                redirect: false
              })
              router.push("/")
        }

        // return {"expired": false};
    }
}