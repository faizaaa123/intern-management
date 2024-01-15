'use client'

import axios from "axios"
import { signJwtRefreshToken } from "../jwt";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import {signOut, useSession} from "next-auth/react"
import router from "next/router";


export const useRefreshToken = () => {

    const refreshToken = async () => {

        // send the refresh token to the backend in order to gain a new access token
        try {
            const res = await axios.post("/api/v1/refresh", {
                refreshToken: localStorage.getItem("refreshToken"),
            })
    
            localStorage.setItem("accessToken", res.data.accessToken)
            
        } catch (error: any) {
            console.log("THIS IS THE ERROR COMING FROM REFRESH RETURN",error);
            // if the refresh token has expired, force the user to sign in again
            if(error['response'] && error['response']['data'] && error['response']['data'] === "Refresh Token has expired") {
                signOut({callbackUrl: "http://localhost:3000"});
            }
        }
    }

    return refreshToken
}
