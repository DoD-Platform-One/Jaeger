# Jaeger

Jaeger Helm Chart, originally sourced from [upstream](https://github.com/jaegertracing/helm-charts) with minimal modifications.

## Upstream Changes

We pull in the "proper" CRD from the jaeger operator repo, located [here](https://github.com/jaegertracing/jaeger-operator/blob/master/deploy/crds/jaegertracing.io_jaegers_crd.yaml) rather than using the version in the Helm chart. Note the separate Kptfile for the crds folder.

There are additional changes we have done to better support metrics and the services in general - these were done due to some upstream inconsistencies with labels.
