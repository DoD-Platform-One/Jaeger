<!-- Warning: Do not manually edit this file. See notes on gluon + helm-docs at the end of this file for more information. -->
# jaeger

![Version: 2.57.0-bb.11](https://img.shields.io/badge/Version-2.57.0--bb.11-informational?style=flat-square) ![AppVersion: 1.65.0](https://img.shields.io/badge/AppVersion-1.65.0-informational?style=flat-square) ![Maintenance Track: bb_maintainted](https://img.shields.io/badge/Maintenance_Track-bb_maintainted-red?style=flat-square)

jaeger-operator Helm chart for Kubernetes

## Upstream References

- <https://www.jaegertracing.io/>
- <https://github.com/jaegertracing/jaeger-operator>

## Upstream Release Notes

- [Find upstream chart's release notes and CHANGELOG here](https://github.com/jaegertracing/helm-charts/releases?q=jaeger-operator&expanded=true)
- [Find upstream applications's release notes and CHANGELOG here](https://github.com/jaegertracing/jaeger/releases/)

## Learn More

- [Application Overview](docs/overview.md)
- [Other Documentation](docs/)

## Pre-Requisites

- Kubernetes Cluster deployed
- Kubernetes config installed in `~/.kube/config`
- Helm installed

Install Helm

https://helm.sh/docs/intro/install/

## Deployment

- Clone down the repository
- cd into directory

```bash
helm install jaeger chart/
```

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| nameOverride | string | `"jaeger-operator"` | Chart name override |
| openshift | object | `{"enabled":false}` | Openshift toggle, only affects networkPolicies |
| sso | object | `{"enabled":false}` | SSO toggle, only affects auth policies |
| monitoring | object | `{"enabled":false,"serviceMonitor":{"scheme":"https","tlsConfig":{"caFile":"/etc/prom-certs/root-cert.pem","certFile":"/etc/prom-certs/cert-chain.pem","insecureSkipVerify":true,"keyFile":"/etc/prom-certs/key.pem"}}}` | Monitoring toggle, affects servicemonitor and networkPolicies |
| domain | string | `"dev.bigbang.mil"` | Domain to service Jaeger virtualService |
| istio.enabled | bool | `false` | Toggle istio integration |
| istio.hardened.enabled | bool | `false` |  |
| istio.hardened.outboundTrafficPolicyMode | string | `"REGISTRY_ONLY"` |  |
| istio.hardened.customServiceEntries | list | `[]` |  |
| istio.hardened.customAuthorizationPolicies | list | `[]` |  |
| istio.hardened.tempo.enabled | bool | `false` |  |
| istio.hardened.tempo.namespaces[0] | string | `"tempo"` |  |
| istio.hardened.tempo.principals[0] | string | `"cluster.local/ns/tempo/sa/tempo-tempo"` |  |
| istio.jaeger.enabled | bool | `true` | Toggle vs creation |
| istio.jaeger.annotations | object | `{}` |  |
| istio.jaeger.labels | object | `{}` |  |
| istio.jaeger.gateways[0] | string | `"istio-gateway/public-ingressgateway"` |  |
| istio.jaeger.hosts[0] | string | `"tracing.{{ .Values.domain }}"` |  |
| istio.mtls | object | `{"mode":"STRICT"}` | Default jaeger peer authentication |
| istio.mtls.mode | string | `"STRICT"` | STRICT = Allow only mutual TLS traffic, PERMISSIVE = Allow both plain text and mutual TLS traffic |
| cleanSvcMonitor | object | `{"enabled":false,"image":{"repository":"registry1.dso.mil/ironbank/big-bang/base","tag":"2.1.0"}}` | Only needed for upgrade from pre-1.29.x, Deletes the servicemonitor that targetted deprecated metrics endpoints |
| webhookCertGen | object | `{"affinity":{},"cleanupProxy":{"image":{"pullPolicy":"IfNotPresent","repository":"registry1.dso.mil/ironbank/big-bang/base","tag":"2.1.0"}},"containerSecurityContext":{"capabilities":{"drop":["ALL"]}},"enabled":true,"image":{"pullPolicy":"IfNotPresent","repository":"registry1.dso.mil/ironbank/opensource/ingress-nginx/kube-webhook-certgen","tag":"v1.5.3"},"nodeSelector":{},"resources":{"limits":{"cpu":"50m","memory":"50Mi"},"requests":{"cpu":"50m","memory":"50Mi"}},"securityContext":{"runAsGroup":65532,"runAsNonRoot":true,"runAsUser":65532},"tolerations":{}}` | Job to generate and patch webhooks with certificate |
| webhookCertGen.enabled | bool | `true` | If disabled must use cert manager and manually patch webhook |
| elasticsearch.enabled | bool | `false` |  |
| elasticsearch.indexTemplateCreation | object | `{"containerSecurityContext":{"capabilities":{"drop":["ALL"]}},"enabled":true,"image":{"repository":"registry1.dso.mil/ironbank/big-bang/base","tag":"2.1.0"},"securityContext":{"runAsGroup":1001,"runAsNonRoot":true,"runAsUser":1001},"servicePriority":10,"spanPriority":11}` | Custom BB job to create required index templates for ES 8.x |
| elasticsearch.indexTemplateCreation.servicePriority | int | `10` | Priority to add to the service index template, cannot conflict with existing templates |
| elasticsearch.indexTemplateCreation.spanPriority | int | `11` | Priority to add to the span index template, cannot conflict with existing templates |
| elasticsearch.username | string | `"elastic"` |  |
| elasticsearch.name | string | `"logging-ek"` |  |
| elasticsearch.namespace | string | `"logging"` |  |
| elasticsearch.storage.options.es.server-urls | string | `"https://{{ $.Values.elasticsearch.name }}-es-http.{{ $.Values.elasticsearch.namespace }}.svc:9200"` |  |
| elasticsearch.storage.options.es.tls.enabled | string | `"true"` |  |
| elasticsearch.storage.options.es.tls.ca | string | `"/es/certificates/ca.crt"` |  |
| elasticsearch.storage.options.es.version | int | `7` |  |
| elasticsearch.storage.options.es.create-index-templates | bool | `false` |  |
| retention.enabled | bool | `false` |  |
| retention.schedule | string | `"0 * * * *"` |  |
| retention.days | int | `5` |  |
| retention.image | string | `"registry1.dso.mil/ironbank/opensource/jaegertracing/jaeger-es-index-cleaner:1.69.0"` |  |
| operatorUpdateStrategy.type | string | `"RollingUpdate"` |  |
| image.repository | string | `"registry1.dso.mil/ironbank/opensource/jaegertracing/jaeger-operator"` |  |
| image.tag | string | `"1.65.0"` |  |
| image.pullPolicy | string | `"Always"` |  |
| image.imagePullSecrets[0] | string | `"private-registry"` |  |
| certs.issuer.create | bool | `false` |  |
| certs.issuer.name | string | `""` |  |
| certs.certificate.create | bool | `false` |  |
| certs.certificate.namespace | string | `""` |  |
| certs.certificate.secretName | string | `"jaeger-operator-webhook-cert"` |  |
| certs.certificate.issuerKind | string | `"Issuer"` |  |
| webhooks.mutatingWebhook.create | bool | `true` |  |
| webhooks.validatingWebhook.create | bool | `true` |  |
| webhooks.port | int | `9443` |  |
| webhooks.service.annotations | object | `{}` |  |
| webhooks.service.create | bool | `true` |  |
| webhooks.service.name | string | `""` |  |
| jaeger.create | bool | `true` |  |
| jaeger.namespace | string | `nil` |  |
| jaeger.spec.strategy | string | `"allInOne"` |  |
| jaeger.spec.ingress.enabled | bool | `false` |  |
| jaeger.spec.annotations | object | `{}` |  |
| jaeger.spec.labels.app | string | `"jaeger"` |  |
| jaeger.spec.labels.version | string | `"{{ .Values.image.tag }}"` |  |
| jaeger.spec.allInOne.image | string | `"registry1.dso.mil/ironbank/opensource/jaegertracing/all-in-one:1.69.0"` |  |
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
| jaeger.spec.allInOne.containerSecurityContext.capabilities.drop[0] | string | `"ALL"` |  |
| jaeger.spec.allInOne.strategy.type | string | `"RollingUpdate"` |  |
| jaeger.spec.agent.maxReplicas | int | `5` |  |
| jaeger.spec.agent.image | string | `"registry1.dso.mil/ironbank/opensource/jaegertracing/jaeger-agent:1.62.0"` |  |
| jaeger.spec.agent.options.log-level | string | `"info"` |  |
| jaeger.spec.agent.imagePullSecrets[0] | string | `"private-registry"` |  |
| jaeger.spec.agent.securityContext.runAsNonRoot | bool | `true` |  |
| jaeger.spec.agent.securityContext.runAsUser | int | `1001` |  |
| jaeger.spec.agent.securityContext.runAsGroup | int | `1001` |  |
| jaeger.spec.agent.containerSecurityContext.capabilities.drop[0] | string | `"ALL"` |  |
| jaeger.spec.agent.strategy.type | string | `"RollingUpdate"` |  |
| jaeger.spec.ingester.maxReplicas | int | `5` |  |
| jaeger.spec.ingester.image | string | `"registry1.dso.mil/ironbank/opensource/jaegertracing/jaeger-ingester:1.69.0"` |  |
| jaeger.spec.ingester.options.log-level | string | `"info"` |  |
| jaeger.spec.ingester.securityContext.runAsNonRoot | bool | `true` |  |
| jaeger.spec.ingester.securityContext.runAsUser | int | `1001` |  |
| jaeger.spec.ingester.securityContext.runAsGroup | int | `1001` |  |
| jaeger.spec.ingester.containerSecurityContext.capabilities.drop[0] | string | `"ALL"` |  |
| jaeger.spec.ingester.strategy.type | string | `"RollingUpdate"` |  |
| jaeger.spec.query.replicas | int | `5` |  |
| jaeger.spec.query.image | string | `"registry1.dso.mil/ironbank/opensource/jaegertracing/jaeger-query:1.69.0"` |  |
| jaeger.spec.query.options.log-level | string | `"info"` |  |
| jaeger.spec.query.securityContext.runAsNonRoot | bool | `true` |  |
| jaeger.spec.query.securityContext.runAsUser | int | `1001` |  |
| jaeger.spec.query.securityContext.runAsGroup | int | `1001` |  |
| jaeger.spec.query.containerSecurityContext.capabilities.drop[0] | string | `"ALL"` |  |
| jaeger.spec.query.strategy.type | string | `"RollingUpdate"` |  |
| jaeger.spec.collector.maxReplicas | int | `5` |  |
| jaeger.spec.collector.image | string | `"registry1.dso.mil/ironbank/opensource/jaegertracing/jaeger-collector:1.69.0"` |  |
| jaeger.spec.collector.options.log-level | string | `"info"` |  |
| jaeger.spec.collector.resources.requests.cpu | string | `"200m"` |  |
| jaeger.spec.collector.resources.requests.memory | string | `"128Mi"` |  |
| jaeger.spec.collector.resources.limits.cpu | string | `"200m"` |  |
| jaeger.spec.collector.resources.limits.memory | string | `"128Mi"` |  |
| jaeger.spec.collector.securityContext.runAsNonRoot | bool | `true` |  |
| jaeger.spec.collector.securityContext.runAsUser | int | `1001` |  |
| jaeger.spec.collector.securityContext.runAsGroup | int | `1001` |  |
| jaeger.spec.collector.containerSecurityContext.capabilities.drop[0] | string | `"ALL"` |  |
| jaeger.spec.collector.strategy.type | string | `"RollingUpdate"` |  |
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
| extraArgs | object | `{}` |  |
| extraEnv | list | `[]` |  |
| serviceExtraLabels | object | `{}` |  |
| extraLabels.app | string | `"jaeger"` |  |
| extraLabels.version | string | `"{{ .Values.image.tag }}"` |  |
| replicaCount | int | `1` |  |
| resources.limits.cpu | string | `"100m"` |  |
| resources.limits.memory | string | `"128Mi"` |  |
| resources.requests.cpu | string | `"100m"` |  |
| resources.requests.memory | string | `"128Mi"` |  |
| nodeSelector | object | `{}` |  |
| tolerations | list | `[]` |  |
| topologySpreadConstraints | list | `[]` |  |
| affinity | object | `{}` |  |
| securityContext.runAsNonRoot | bool | `true` |  |
| securityContext.runAsUser | int | `1001` |  |
| securityContext.runAsGroup | int | `1001` |  |
| containerSecurityContext | object | `{}` |  |
| priorityClassName | string | `nil` |  |
| hostNetwork | bool | `false` |  |
| metricsPort | int | `8383` |  |
| annotations | object | `{}` |  |
| networkPolicies.enabled | bool | `false` |  |
| networkPolicies.ingressLabels.app | string | `"public-ingressgateway"` |  |
| networkPolicies.ingressLabels.istio | string | `"ingressgateway"` |  |
| networkPolicies.controlPlaneCidr | string | `"0.0.0.0/0"` |  |
| networkPolicies.vpcCidr | string | `"0.0.0.0/0"` |  |
| networkPolicies.additionalPolicies | list | `[]` |  |
| bbtests.enabled | bool | `false` |  |
| bbtests.cypress.artifacts | bool | `true` |  |
| bbtests.cypress.envs.cypress_url | string | `"http://jaeger-query:16686"` |  |
| waitJob.enabled | bool | `true` |  |
| waitJob.permissions.apiGroups[0] | string | `"jaeger.io"` |  |
| waitJob.permissions.apiGroups[1] | string | `"jaeger.io/v1alpha1"` |  |
| waitJob.permissions.resources[0] | string | `"jaeger"` |  |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.

---

_This file is programatically generated using `helm-docs` and some BigBang-specific templates. The `gluon` repository has [instructions for regenerating package READMEs](https://repo1.dso.mil/big-bang/product/packages/gluon/-/blob/master/docs/bb-package-readme.md)._

