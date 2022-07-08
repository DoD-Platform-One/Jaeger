# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---
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
