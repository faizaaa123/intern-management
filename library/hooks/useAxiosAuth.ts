"use client"
import { useSession } from "next-auth/react"
import { axiosAuth } from "../axios";
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";

const useAxiosAuth = () => {
    const {data: session} = useSession()
    const refreshToken = useRefreshToken()

    useEffect(() => {
        // for every axios request using axiosAuth, check that authorization is defined in the header
        const requestIntercept = axiosAuth.interceptors.request.use((config)=> {
            if (!config.headers["Authorization"]) {
                config.headers["Authorization"] = `${session?.user.accessToken}`
            }

            return config
        },
        (error) => Promise.reject(error)
        )

        // if response comes back as 401 (ie, access token is expired) use refresh token to update the access token 
        // before making the request again
        const responseIntercept = axiosAuth.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error.config;
                if (error.response.status == 401 && !prevRequest.sent) {
                    prevRequest.sent = true;

                    await refreshToken()

                    prevRequest.headers["Authorization"] = `${localStorage.getItem("accessToken")}`

                    return axiosAuth(prevRequest);
                }

                return Promise.reject(error)
            }
        )

        return () => {
            axiosAuth.interceptors.request.eject(requestIntercept)
            axiosAuth.interceptors.response.eject(responseIntercept)
        }
    }, [session])

    return axiosAuth
}

export default useAxiosAuth;