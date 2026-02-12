# Keycloak / SSO Configuration

As of chart version 2.57.0-bb.12, SSO configuration has been removed from the Jaeger package. Jaeger SSO is now managed through Big Bang's [authservice](https://repo1.dso.mil/big-bang/product/packages/authservice) integration at the umbrella level.

## Configuration

To enable SSO for Jaeger, configure authservice in your Big Bang values override. No Jaeger-specific Keycloak client setup is required — authservice handles authentication transparently via Istio.

Refer to the [Big Bang documentation](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/docs/understanding-bigbang/package-architecture/authservice.md) for details on configuring authservice and SSO for protected packages.
