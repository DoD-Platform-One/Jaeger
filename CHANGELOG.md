# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.56.0-bb.0] - 2024-08-22

### Added

- Update jaegar 2.54.0 -> 2.56.0
- Update jaegertracing 1.57.0 -> 1.60.0
- Update gluon 0.5.0 -> 0.5.3

## [2.54.0-bb.3] - 2024-08-12

### Updated

- Updated templating in `chart/templates/deployment.yaml` and `chart/templates/jaeger.yaml` to add `tpl` for label interpretation

## [2.54.0-bb.2] - 2024-07-03

### Removed

- Removed shared authPolicies set at the Istio level

## [2.54.0-bb.1] - 2024-06-14

### Added

- Update DEVELOPMENT_MAINTENANCE.md to document the Big Bang specific changes from upstream

## [2.54.0-bb.0] - 2024-05-23

### Added

- Update to jaegar 2.54.0

## [2.53.0-bb.1] - 2024-04-19

### Added

- Added custom network policies

## [2.53.0-bb.0] - 2024-04-16

### Updated

- Updated Jaeger to 2.53.0

## [2.50.1-bb.3] - 2024-03-21

### Changed

- Adding Sidecar to deny egress that is external to istio services
- Adding customServiceEntries to allow egress to override sidecar

## [2.50.1-bb.2] - 2024-03-20

### Updated

- Fixing ingress gateway authz policy

## [2.50.1-bb.1] - 2024-03-18

### Added

- Added support ingress gateway authz policy

## [2.50.1-bb.0] - 2024-01-25

### Updated

- Upgrade chart to 2.50.1
- Upgrade images to 1.53.0

## [2.47.0-bb.4] - 2024-01-22

### Added

- Added support for Istio Authorization Policies

## [2.47.0-bb.3] - 2024-01-19

### Updated

- Updating gluon to 4.7 to allow consumers to utilize their own tests

## [2.47.0-bb.2] - 2023-10-30

### Updated

- Updating OSCAL Component File.

## [2.47.0-bb.1] - 2023-10-11

### Updated

- Modified OSCAL Version for jaeger and updated to 1.1.1

## [2.47.0-bb.0] - 2023-09-28

### Updated

- Upgrade chart to 2.47.0
- Upgrade images to 1.47.0

## [2.46.0-bb.2] - 2023-09-20

### Removed

- Updated to gluon 0.4.1 and Cypress 13.x
- Update cypress test to remove explicit wait and replaced with implicit timeout

## [2.46.0-bb.2] - 2023-08-22

### Removed

- Removed variables for cypress sso testing

## [2.46.0-bb.1] - 2023-08-21

### Added

- Added sso capability testing for cypress tests

## [2.46.0-bb.0] - 2023-06-30

### Updated

- Upgrade chart to 2.46.0
- Upgrade images to 1.46.0

## [2.45.0-bb.2] - 2023-5-31

### Changed

- Modified securityContext for es-index-templates job to run as non root user/group

## [2.45.0-bb.1] - 2023-05-26

### Added

- Added SCC and NetworkAttachmentDefinition for OpenShift

## [2.45.0-bb.0] - 2023-05-23

### Updated

- Upgrade chart to 2.45.0
- Upgrade images to 1.45.0

## [2.42.0-bb.1] - 2023-05-17

### Updated

- Update chat/values.yaml hostname key to domain
- Updated docs, changing hostname to domain

## [2.42.0-bb.0] - 2023-04-11

### Changed

- Updated Jaeger images to 1.43.0 (latest operator version)
- Updated helm chart version to upstream latest - 2.42.0

## [2.41.0-bb.0] - 2023-03-17

### Changed

- Updated Jaeger images to 1.42.0 (latest operator version)
- Updated operator chart to 2.41.0
- Added upstream value certs.certificate.issuerKind

## [2.38.0-bb.2] - 2023-03-14

### Changed

- Modify chart name to jaeger from jaeger-operator to match the bb chart values file.
- Add nameOverride to the values file

## [2.38.0-bb.1] - 2023-01-17

### Changed

- Update gluon to new registry1 location + latest version (0.3.2)

## [2.38.0-bb.0] - 2023-01-12

### Changed

- Updated Jaeger images to 1.41.0 (latest operator version)
- Updated operator chart to 2.38.0

## [2.37.0-bb.0]

### Changed

- Updated Jaeger images to 1.39.0 (latest operator version)

## [2.36.0-bb.1]

### Changed

- Set deployment containers to run with capabilities set to explicit deny
- Set job containers to run with capabilities set to explicit deny

## [2.36.0-bb.0]

### Changed

- Updated Jaeger images to 1.38.0 (latest operator version)

## [2.35.0-bb.1]

### Changed

- Enabled mTLS for Jaeger metrics
- Updated Gluon to 0.3.0

## [2.35.0-bb.0]

### Changed

- Updated Jaeger images to 1.37.0 (latest operator version)

## [2.34.0-bb.0]

### Changed

- Updated Jaeger images to 1.36.0 (latest operator version)

## [2.33.0-bb.0]

### Changed

- Updated Jaeger images to 1.35.2 (operator version 1.35.0)

## [2.32.2-bb.3]

### Changed

- All security contexts set to drop all Capabilities

## [2.32.2-bb.2]

### Added

- Addition of new index creation job to support ES 8+

## [2.32.2-bb.1]

### Changed

- Update bb base image to 2.0.0

## [2.32.2-bb.0]

### Changed

- Updated Jaeger images to 1.34.1
- Switched back to upstream chart for Kpt/development guide
- Added `RollingUpdate` strategy to all pods for Jaeger

## [2.30.0-bb.2]

### Changed

- Modified securityContext for all pods to run as non root user/group

## [2.30.0-bb.1]

### Changed

- Fixed oscal

## [2.30.0-bb.0]

### Changed

- Updated charts using 1.33.0 manifests
- Updated images to 1.33.0
- Updated update documentation and renamed to "DEVELOPMENT_MAINTENANCE.md" to match other standards

## [2.29.0-bb.1]

### Fixed

- Fixed OSCAL schema validation issues

## [2.29.0-bb.0]

### Updated

- Updated to 2.29.0 upstream chart and updated all images to 1.32.0
- Added webhooks (missing from 2.29.0 upstream chart) and webhook certificate job to generate cert and patch the webhooks

## [2.27.1-bb.4]

### Changed

- Modified PeerAuthentication to allow for passing in mode

## [2.27.1-bb.3]

### Changed

- Fixed sidecar not getting injected to jaeger pod

## [2.27.1-bb.2]

### Added

- Update Chart.yaml to follow new standardization for release automation
- Added renovate check to update new standardization

## [2.27.1-bb.1]

### Added

- Add istio mtls STRICT

## [2.27.1-bb.0]

### Changed

- Upgraded to the upstream 2.27.1 chart
- Updated operator image to 1.29.1
- Updated service images to 1.29.0

## [2.27.0-bb.4]

### Added

- Relocated bbtests values

## [2.27.0-bb.3]

### Added

- Added OSCAL document containing NIST 800-53 controls

## [2.27.0-bb.2]

### Added

- Added support for arbitrary ElasticSearch storage options in the Jaeger CR

## [2.27.0-bb.1]

### Added

- Added support for pod annotations on the operator

## [2.27.0-bb.0]

### Changed

- Updated to the upstream 2.27.0 chart.  All images updated to 1.28.0.

## [2.26.0-bb.0]

### Changed

- Updated to the upstream 2.26.0 chart.  All images updated to 1.27.0.

## [2.23.0-bb.5]

### Added

- Added auth policy for Monitoring

## [2.23.0-bb.4]

### Added

- Added auth policy for Kiali

## [2.23.0-bb.3]

### Fixed

- Fixed typo in Ingester image name

## [2.23.0-bb.2]

### Added

- Added wait script for CI

## [2.23.0-bb.1]

### Changed

- Removed CRD update job, planning to handle with Flux instead

## [2.23.0-bb.0]

### Changed

- Updated to the latest upstream chart
- Updated to the latest CRD

### Added

- Job that handles CRD updates added to the chart

### Fixed

- Incorrect values being set in the `Jaeger` instance removed to prevent validation errors

## [2.22.0-bb.2]

### Changed

- Changed DNS network policy to allow for openshift dns of port 5353
- Added openshift.enabled to values file

## [2.22.0-bb.1]

### Changed

- Updated to use ports 8383 and 8686 for network policy
- Added name label for selectors to match correctly

## [2.22.0-bb.0]

### Changed

- Updated to upstream 2.22.0 chart, 1.24.0 images from Ironbank
- Removed ingress by default, provided values passthrough

## [2.21.4-bb.2]

### Changed

- Added network policy
- Moved to GLuon 0.2.1

## [2.21.4-bb.1]

### Changed

- Added fix to allow helm upgrades due to upstream adding a label to an immutable field.

## [2.21.4-bb.0]

### Changed

- Upstream chart merged with 2.21.4 -- merged in even though upstream support for Jaeger 1.23.0 is not yet available
- Images from registry1.dso.mil/ironbank/opensource/jaegertracing bumped to 1.23.0

## [2.19.1-bb.5]

### Added

- Changelog
- Helm tests using library
