import {Auth0Provider} from "@auth0/auth0-react"
import dotenv from "dotenv";

dotenv.config()

const {
    AUTH0_CLIENT_ID,
    AUTH0_ISSUER_BASE_URL,
    BASE_URL
} = process.env

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = AUTH0_ISSUER_BASE_URL;
  const clientId = AUTH0_CLIENT_ID;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri= {BASE_URL} //apparently will need to use this since `redirctUri will no longer be supported: authorizationParams.redirect_uri`
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;