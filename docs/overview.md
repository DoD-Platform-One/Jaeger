# Jaeger

## Overview

This package contains an installation of Jaeger using a Helm chart sourced from [upstream](https://github.com/jaegertracing/helm-charts) with minimal modifications. This chart makes use of the Jaeger Operator for installs/upgrades.

## Jaeger

[Jaeger](https://www.jaegertracing.io/) is an open-source application providing end-to-end distributed tracing for network observability.
This repo provides an implementation of Jaeger for Big Bang. Installation requires that Istio be installed (and optionally Elasticsearch for long-term tracing storage).

## How it works

Jaeger receives traces from Istio sidecars across the cluster. Each trace helps visualize a segment of traffic flowing between pods and services. By default, Jaeger is deployed using the `allInOne` strategy with in-memory storage. For persistent storage, Elasticsearch can be enabled via `elasticsearch.enabled: true` in the values file.

> **Note:** [Tempo](https://repo1.dso.mil/big-bang/product/packages/tempo) is Big Bang's recommended tracing backend for new deployments. Jaeger remains supported for existing installations.

## Integrations

- **Istio** — Collects distributed traces via sidecar proxies and provides service mesh integration
- **Kiali** — Visualizes traces alongside service mesh topology
- **Prometheus** — Monitors Jaeger operator and instance metrics via ServiceMonitor
