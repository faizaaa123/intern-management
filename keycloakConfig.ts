import Keycloak from 'keycloak-js';
import dotenv from "dotenv";

dotenv.config()

const {
  KEYCLOAK_URL,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_REALM
} = process.env

const keycloakConfig = {
  realm: KEYCLOAK_REALM,
  clientId: KEYCLOAK_CLIENT_ID,
  url: KEYCLOAK_URL,
  "enable-cors": true,
};

const isBrowser = typeof window !== 'undefined';
const keycloak = isBrowser ? new Keycloak(keycloakConfig) : null;

export default keycloak;