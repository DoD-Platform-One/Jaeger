# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.22.0-bb.0]
### Changed
- Updated to upstream 2.22.0 chart, 1.24.0 images from Ironbank
- Removed ingress by default, provided values passthrough as a toggle

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
