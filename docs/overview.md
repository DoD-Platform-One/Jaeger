# Jaeger

## Overview

This package contains an installation of Jaeger using a helm chart sourced from [upstream](https://github.com/jaegertracing/helm-charts) with minimal modifications. This chart makes use of the Jaeger Operator for installs/upgrades.

## Jaeger

[Jaeger](https://www.jaegertracing.io/) is an open-source application providing end-to-end distributed tracing for network observability.
This repo provides an implementation of Jaeger for Big Bang. Installation requires that Istio be installed (and Elastic for long term tracing storage).

## How it works

Jaeger receives "traces" from all istio sidecars in the cluster. Each of these traces help visualize a segment of traffic flowing between pods/services in the cluster. Traces are by default stored in memory, but Big Bang configures Jaeger to store them in Elasticsearch for high availability and persistence.

Please review the BigBang [Architecture Document](https://repo1.dso.mil/platform-one/big-bang/bigbang/-/blob/master/charter/packages/jaeger/Architecture.md) for more information about it's role within BigBang.
