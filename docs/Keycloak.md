# Keycloak Configuration

#### Jaeger
1. Create a jaeger client
   - Change the following configuration items
      - access type: confidential _this will enable a "Credentials" tab within the client configuration page_
      - Direct Access Grants Enabled: Off
      - Valid Redirect URIs: https://tracing.${DOMAIN}/login
      - Base URL: https://tracing.${DOMAIN}
    - Take note of the client secret in the credentia