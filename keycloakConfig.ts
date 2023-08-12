import Keycloak from 'keycloak-js';

const keycloakConfig = {
  realm: 'your-realm-name',
  clientId: 'your-client-id',
  url: 'https://your-keycloak-server/auth',
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;