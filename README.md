# jaeger-operator

![Version: 2.27.0-bb.2](https://img.shields.io/badge/Version-2.27.0--bb.2-informational?style=flat-square) ![AppVersion: 1.28.0](https://img.shields.io/badge/AppVersion-1.28.0-informational?style=flat-square)

jaeger-operator Helm chart for Kubernetes

## Upstream References
* <https://www.jaegertracing.io/>

* <https://github.com/jaegertracing/jaeger-operator>

## Learn More
* [Application Overview](docs/overview.md)
* [Other Documentation](docs/)

## Pre-Requisites

* Kubernetes Cluster deployed
* Kubernetes config installed in `~/.kube/config`
* Helm installed

Install Helm

https://helm.sh/docs/intro/install/

## Deployment

* Clone down the repository
* cd into directory
```bash
helm install jaeger-operator chart/
```

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| openshift.enabled | bool | `false` |  |
| sso.enabled | bool | `false` |  |
| monitoring.enabled | bool | `false` |  |
| hostname | string | `"bigbang.dev"` |  |
| istio.enabled | bool | `false` |  |
| istio.jaeger.enabled | bool | `true` |  |
| istio.jaeger.annotations | object | `{}` |  |
| istio.jaeger.labels | object | `{}` |  |
| istio.jaeger.gateways[0] | string | `"istio-system/main"` |  |
| istio.jaeger.hosts[0] | string | `"tracing.{{ .Values.hostname }}"` |  |
| image.repository | string | `"registry1.dso.mil/ironbank/opensource/jaegertracing/jaeger-operator"` |  |
| image.tag | string | `"1.28.0"` |  |
| image.pullPolicy | string | `"Always"` |  |
| image.imagePullSecrets[0] | string | `"private-registry"` |  |
| elasticsearch.enabled | bool | `false` |  |
| elasticsearch.username | string | `"elastic"` |  |
| elasticsearch.name | string | `"logging-ek"` |  |
| elasticsearch.namespace | string | `"logging"` |  |
| elasticsearch.storage.options.es.server-urls | string | `"https://{{ $.Values.elasticsearch.name }}-es-http.{{ $.Values.elasticsearch.namespace }}.svc:9200"` |  |
| elasticsearch.storage.options.es.tls.enabled | string | `"true"` |  |
| elasticsearch.storage.options.es.tls.ca | string | `"/es/certificates/ca.crt"` |  |
| retention.enabled | bool | `false` |  |
| retention.schedule | string | `"0 * * * *"` |  |
| retention.days | int | `5` |  |
| retention.image | string | `"registry1.dso.mil/ironbank/opensource/jaegertracing/jaeger-es-index-cleaner:1.28.0"` |  |
| jaeger.create | bool | `true` |  |
| jaeger.spec.strategy | string | `"allInOne"` |  |
| jaeger.spec.ingress.enabled | bool | `false` |  |
| jaeger.spec.annotations | object | `{}` |  |
| jaeger.spec.labels | object | `{}` |  |
| jaeger.spec.allInOne.image | string | `"registry1.dso.mil/ironbank/opensource/jaegertracing/all-in-one:1.28.0"` |  |
| jaeger.spec.allInOne.annotations."sidecar.istio.io/inject" | string | `"true"` |  |
| jaeger.spec.allInOne.annotations."traffic.sidecar.istio.io/includeInboundPorts" | string | `"16686"` |  |
| jaeger.spec.allInOne.options.log-level | string | `"info"` |  |
| jaeger.spec.allInOne.options.collector.zipkin.host-port | string | `":9411"` |  |
| jaeger.spec.allInOne.resources.requests.cpu | string | `"200m"` |  |
| jaeger.spec.allInOne.resources.requests.memory | string | `"128Mi"` |  |
| jaeger.spec.allInOne.resources.limits.cpu | string | `"200m"` |  |
| jaeger.spec.allInOne.resources.limits.memory | string | `"128Mi"` |  |
| jaeger.spec.agent.maxReplicas | int | `5` |  |
| jaeger.spec.agent.image | string | `"registry1.dso.mil/ironbank/opensource/jaegertracing/jaeger-agent:1.28.0"` |  |
| jaeger.spec.agent.options.log-level | string | `"info"` |  |
| jaeger.spec.agent.imagePullSecrets[0] | string | `"private-registry"` |  |
| jaeger.spec.ingester.maxReplicas | int | `5` |  |
| jaeger.spec.ingester.image | string | `"registry1.dso.mil/ironbank/opensource/jaegertracing/jaeger-ingester:1.28.0"` |  |
| jaeger.spec.ingester.options.log-level | string | `"info"` |  |
| jaeger.spec.query.replicas | int | `5` |  |
| jaeger.spec.query.image | string | `"registry1.dso.mil/ironbank/opensource/jaegertracing/jaeger-query:1.28.0"` |  |
| jaeger.spec.query.options.log-level | string | `"info"` |  |
| jaeger.spec.collector.maxReplicas | int | `5` |  |
| jaeger.spec.collector.image | string | `"registry1.dso.mil/ironbank/opensource/jaegertracing/jaeger-collector:1.28.0"` |  |
| jaeger.spec.collector.options.log-level | string | `"info"` |  |
| jaeger.spec.collector.resources.requests.cpu | string | `"200m"` |  |
| jaeger.spec.collector.resources.requests.memory | string | `"128Mi"` |  |
| jaeger.spec.collector.resources.limits.cpu | string | `"200m"` |  |
| jaeger.spec.collector.resources.limits.memory | string | `"128Mi"` |  |
| jaeger.spec.volumeMounts[0].name | string | `"certificates"` |  |
| jaeger.spec.volumeMounts[0].mountPath | string | `"/es/certificates/"` |  |
| jaeger.spec.volumeMounts[0].readOnly | bool | `true` |  |
| jaeger.spec.volumes[0].name | string | `"certificates"` |  |
| jaeger.spec.volumes[0].secret.secretName | string | `"elasticsearch-certificates"` |  |
| rbac.create | bool | `true` |  |
| rbac.pspEnabled | bool | `false` |  |
| rbac.clusterRole | bool | `true` |  |
| service.type | string | `"ClusterIP"` |  |
| service.annotations | object | `{}` |  |
| serviceAccount.create | bool | `true` |  |
| serviceAccount.name | string | `"jaeger-instance"` |  |
| serviceAccount.annotations | object | `{}` |  |
| extraEnv | list | `[]` |  |
| extraLabels | object | `{}` |  |
| annotations | object | `{}` |  |
| resources.limits.cpu | string | `"100m"` |  |
| resources.limits.memory | string | `"128Mi"` |  |
| resources.requests.cpu | string | `"100m"` |  |
| resources.requests.memory | string | `"128Mi"` |  |
| nodeSelector | object | `{}` |  |
| tolerations | list | `[]` |  |
| affinity | object | `{}` |  |
| securityContext | object | `{}` |  |
| networkPolicies.enabled | bool | `false` |  |
| networkPolicies.ingressLabels.app | string | `"istio-ingressgateway"` |  |
| networkPolicies.ingressLabels.istio | string | `"ingressgateway"` |  |
| networkPolicies.controlPlaneCidr | string | `"0.0.0.0/0"` |  |
| priorityClassName | string | `nil` |  |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.
