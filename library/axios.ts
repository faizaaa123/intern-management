import axios from "axios";

// configuring axios

const BASE_URL = "http://localhost:5005";

export default axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type":
    "application/json" },
})

export const axiosAuth = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type":
    "application/json" },
})

