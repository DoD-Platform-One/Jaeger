# jaeger-operator

![Version: 2.32.2-bb.2](https://img.shields.io/badge/Version-2.32.2--bb.2-informational?style=flat-square) ![AppVersion: 1.34.1](https://img.shields.io/badge/AppVersion-1.34.1-informational?style=flat-square)

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
| openshift | object | `{"enabled":false}` | Openshift toggle, only affects networkPolicies |
| sso | object | `{"enabled":false}` | SSO toggle, only affects auth policies |
| monitoring | object | `{"enabled":false}` | Monitoring toggle, affects servicemonitor and networkPolicies |
| hostname | string | `"bigbang.dev"` | Hostname to service Jaeger virtualService |
| istio.enabled | bool | `false` | Toggle istio integration |
| istio.jaeger.enabled | bool | `true` | Toggle vs creation |
| istio.jaeger.annotations | object | `{}` |  |
| istio.jaeger.labels | object | `{}` |  |
| istio.jaeger.gateways[0] | string | `"istio-system/main"` |  |
| istio.jaeger.hosts[0] | string | `"tracing.{{ .Values.hostname }}"` |  |
| istio.mtls | object | `{"mode":"STRICT"}` | Default jaeger peer authentication |
| istio.mtls.mode | string | `"STRICT"` | STRICT = Allow only mutual TLS traffic, PERMISSIVE = Allow both plain text and mutual TLS traffic |
| cleanSvcMonitor | object | `{"enabled":false,"image":{"repository":"registry1.dso.mil/ironbank/big-bang/base","tag":"2.0.0"}}` | Only needed for upgrade from pre-1.29.x, Deletes the servicemonitor that targetted deprecated metrics endpoints |
| webhookCertGen | object | `{"affinity":{},"cleanupProxy":{"image":{"pullPolicy":"IfNotPresent","repository":"registry1.dso.mil/ironbank/big-bang/base","tag":"2.0.0"}},"enabled":true,"image":{"pullPolicy":"IfNotPresent","repository":"registry1.dso.mil/ironbank/opensource/ingress-nginx/kube-webhook-certgen","tag":"v1.1.1"},"nodeSelector":{},"resources":{"limits":{"cpu":"50m","memory":"50Mi"},"requests":{"cpu":"50m","memory":"50Mi"}},"securityContext":{"runAsGroup":65532,"runAsNonRoot":true,"runAsUser":65532},"tolerations":{}}` | Job to generate and patch webhooks with certificate |
| webhookCertGen.enabled | bool | `true` | If disabled must use cert manager and manually patch webhook |
| image.repository | string | `"registry1.dso.mil/ironbank/opensource/jaegertracing/jaeger-operator"` |  |
| image.tag | string | `"1.34.1"` |  |
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
| retention.image | string | `"registry1.dso.mil/ironbank/opensource/jaegertracing/jaeger-es-index-cleaner:1.34.1"` |  |
| jaeger.create | bool | `true` |  |
| jaeger.spec.strategy | string | `"allInOne"` |  |
| jaeger.spec.ingress.enabled | bool | `false` |  |
| jaeger.spec.annotations | object | `{}` |  |
| jaeger.spec.labels | object | `{}` |  |
| jaeger.spec.allInOne.image | string | `"registry1.dso.mil/ironbank/opensource/jaegertracing/all-in-one:1.34.1"` |  |
| jaeger.spec.allInOne.options.log-level | string | `"info"` |  |
| jaeger.spec.allInOne.options.collector.zipkin.host-port | string | `":9411"` |  |
| jaeger.spec.allInOne.annotations."sidecar.istio.io/inject" | string | `"true"` |  |
| jaeger.spec.allInOne.annotations."traffic.sidecar.istio.io/includeInboundPorts" | string | `"16686"` |  |
| jaeger.spec.allInOne.resources.requests.cpu | string | `"200m"` |  |
| jaeger.spec.allInOne.resources.requests.memory | string | `"128Mi"` |  |
| jaeger.spec.allInOne.resources.limits.cpu | string | `"200m"` |  |
| jaeger.spec.allInOne.resources.limits.memory | string | `"128Mi"` |  |
| jaeger.spec.allInOne.securityContext.runAsNonRoot | bool | `true` |  |
| jaeger.spec.allInOne.securityContext.runAsUser | int | `1001` |  |
| jaeger.spec.allInOne.securityContext.runAsGroup | int | `1001` |  |
| jaeger.spec.allInOne.strategy.type | string | `"RollingUpdate"` |  |
| jaeger.spec.agent.maxReplicas | int | `5` |  |
| jaeger.spec.agent.image | string | `"registry1.dso.mil/ironbank/opensource/jaegertracing/jaeger-agent:1.34.1"` |  |
| jaeger.spec.agent.options.log-level | string | `"info"` |  |
| jaeger.spec.agent.imagePullSecrets[0] | string | `"private-registry"` |  |
| jaeger.spec.agent.securityContext.runAsNonRoot | bool | `true` |  |
| jaeger.spec.agent.securityContext.runAsUser | int | `1001` |  |
| jaeger.spec.agent.securityContext.runAsGroup | int | `1001` |  |
| jaeger.spec.agent.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| jaeger.spec.agent.strategy.type | string | `"RollingUpdate"` |  |
| jaeger.spec.ingester.maxReplicas | int | `5` |  |
| jaeger.spec.ingester.image | string | `"registry1.dso.mil/ironbank/opensource/jaegertracing/jaeger-ingester:1.34.1"` |  |
| jaeger.spec.ingester.options.log-level | string | `"info"` |  |
| jaeger.spec.ingester.securityContext.runAsNonRoot | bool | `true` |  |
| jaeger.spec.ingester.securityContext.runAsUser | int | `1001` |  |
| jaeger.spec.ingester.securityContext.runAsGroup | int | `1001` |  |
| jaeger.spec.ingester.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| jaeger.spec.ingester.strategy.type | string | `"RollingUpdate"` |  |
| jaeger.spec.query.replicas | int | `5` |  |
| jaeger.spec.query.image | string | `"registry1.dso.mil/ironbank/opensource/jaegertracing/jaeger-query:1.34.1"` |  |
| jaeger.spec.query.options.log-level | string | `"info"` |  |
| jaeger.spec.query.securityContext.runAsNonRoot | bool | `true` |  |
| jaeger.spec.query.securityContext.runAsUser | int | `1001` |  |
| jaeger.spec.query.securityContext.runAsGroup | int | `1001` |  |
| jaeger.spec.query.strategy.type | string | `"RollingUpdate"` |  |
| jaeger.spec.collector.maxReplicas | int | `5` |  |
| jaeger.spec.collector.image | string | `"registry1.dso.mil/ironbank/opensource/jaegertracing/jaeger-collector:1.34.1"` |  |
| jaeger.spec.collector.options.log-level | string | `"info"` |  |
| jaeger.spec.collector.resources.requests.cpu | string | `"200m"` |  |
| jaeger.spec.collector.resources.requests.memory | string | `"128Mi"` |  |
| jaeger.spec.collector.resources.limits.cpu | string | `"200m"` |  |
| jaeger.spec.collector.resources.limits.memory | string | `"128Mi"` |  |
| jaeger.spec.collector.securityContext.runAsNonRoot | bool | `true` |  |
| jaeger.spec.collector.securityContext.runAsUser | int | `1001` |  |
| jaeger.spec.collector.securityContext.runAsGroup | int | `1001` |  |
| jaeger.spec.collector.strategy.type | string | `"RollingUpdate"` |  |
| jaeger.spec.volumeMounts[0].name | string | `"certificates"` |  |
| jaeger.spec.volumeMounts[0].mountPath | string | `"/es/certificates/"` |  |
| jaeger.spec.volumeMounts[0].readOnly | bool | `true` |  |
| jaeger.spec.volumes[0].name | string | `"certificates"` |  |
| jaeger.spec.volumes[0].secret.secretName | string | `"elasticsearch-certificates"` |  |
| operatorUpdateStrategy.type | string | `"RollingUpdate"` |  |
| rbac.create | bool | `true` |  |
| rbac.pspEnabled | bool | `false` |  |
| rbac.clusterRole | bool | `true` |  |
| certs.issuer.create | bool | `false` |  |
| certs.issuer.name | string | `""` |  |
| certs.certificate.create | bool | `false` |  |
| certs.certificate.namespace | string | `""` |  |
| certs.certificate.secretName | string | `"jaeger-operator-webhook-cert"` |  |
| webhooks.mutatingWebhook.create | bool | `true` |  |
| webhooks.validatingWebhook.create | bool | `true` |  |
| webhooks.service.annotations | object | `{}` |  |
| webhooks.service.create | bool | `true` |  |
| webhooks.service.name | string | `""` |  |
| service.type | string | `"ClusterIP"` |  |
| service.annotations | object | `{}` |  |
| serviceAccount.create | bool | `true` |  |
| serviceAccount.name | string | `"jaeger-instance"` |  |
| serviceAccount.annotations | object | `{}` |  |
| extraEnv | list | `[]` |  |
| extraLabels | object | `{}` |  |
| resources.limits.cpu | string | `"100m"` |  |
| resources.limits.memory | string | `"128Mi"` |  |
| resources.requests.cpu | string | `"100m"` |  |
| resources.requests.memory | string | `"128Mi"` |  |
| nodeSelector | object | `{}` |  |
| tolerations | list | `[]` |  |
| affinity | object | `{}` |  |
| securityContext.runAsNonRoot | bool | `true` |  |
| securityContext.runAsUser | int | `1001` |  |
| securityContext.runAsGroup | int | `1001` |  |
| annotations | object | `{}` |  |
| networkPolicies.enabled | bool | `false` |  |
| networkPolicies.ingressLabels.app | string | `"istio-ingressgateway"` |  |
| networkPolicies.ingressLabels.istio | string | `"ingressgateway"` |  |
| networkPolicies.controlPlaneCidr | string | `"0.0.0.0/0"` |  |
| priorityClassName | string | `nil` |  |
| bbtests.enabled | bool | `false` |  |
| bbtests.cypress.artifacts | bool | `true` |  |
| bbtests.cypress.envs.cypress_url | string | `"http://jaeger-query:16686"` |  |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.
