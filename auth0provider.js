import {Auth0Provider} from "@auth0/auth0-react"
import dotenv from "dotenv";

dotenv.config()

const {
    AUTH0_CLIENT_ID,
    AUTH0_ISSUER_BASE_URL,
    AUTH0_BASE_URL,
    AUTH0_DOMAIN
} = process.env

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = AUTH0_DOMAIN;
  const clientId = AUTH0_CLIENT_ID;
  const baseUrl = AUTH0_BASE_URL

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri= {baseUrl} //apparently will need to use this since `redirctUri will no longer be supported: authorizationParams.redirect_uri`
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;