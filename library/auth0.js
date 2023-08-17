import { initAuth0 } from '@auth0/nextjs-auth0';
import dotenv from "dotenv";

dotenv.config()

const {
    AUTH0_SECRET,
    AUTH0_CLIENT_ID,
    AUTH0_ISSUER_BASE_URL,
    AUTH0_BASE_URL,
    AUTH0_CLIENT_SECRET,
    DOMAIN,
  } = process.env
  
const auth0 = initAuth0({
  baseURL: AUTH0_BASE_URL, // Change this to your actual base URL
  clientID: AUTH0_CLIENT_ID,
  clientSecret: AUTH0_CLIENT_SECRET,
  issuerBaseURL: AUTH0_ISSUER_BASE_URL,
  routes: {
    login: '/auth/login',
    callback: '/auth/callback',
    logout: '/auth/logout',
    // Add more custom routes if needed
  },
});

export default auth0;