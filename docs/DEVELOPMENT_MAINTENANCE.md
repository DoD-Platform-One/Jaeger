# Code Changes for Updates

Jaeger is a modified/customized version of an upstream chart. The below details the steps required to update to a new version of the Jaeger package.

1. Navigate to the [upstream chart repo and folder](https://github.com/jaegertracing/helm-charts/tree/main/charts/jaeger-operator) and find the tag that corresponds with the new chart version for this image update. 
    - For example, if updating the Jaeger images to 1.28 you would check the [chart values](https://github.com/jaegertracing/helm-charts/blob/main/charts/jaeger-operator/values.yaml#L7) and switch Gitlab tags until you find the latest chart version that uses 1.28 images. In this case that is [`jaeger-operator-2.27.0`](https://github.com/jaegertracing/helm-charts/blob/jaeger-operator-2.27.0/charts/jaeger-operator/values.yaml#L7) (as of this doc construction).

2. Checkout the `renovate/ironbank` branch. This branch will already have the updates you need for the images.

3. From the root of the repo run `kpt pkg update chart@jaeger-operator-<tag> --strategy alpha-git-patch` replacing `<tag>` with the version tag you got in step 1. 
    - You may be prompted to resolve some conflicts - choose what makes sense (if there are BB additions/changes keep them, if there are upstream additions/changes keep them). 
    - Follow the `Modifications made to upstream chart` section of this document for a list of changes per file to be aware of, for how Big Bang differs from upstream.

4. Modify the `version` in `Chart.yaml` - you will want to append `-bb.0` to the chart version from upstream. update dependencies to latest BB gluon library version.
    ```
    helm dependency update ./chart
    ```

5. Update `CHANGELOG.md` adding an entry for the new version and noting all changes (at minimum should include `- Updated Jaeger to x.x.x`).

6. Generate the `README.md` updates by following the [guide in gluon](https://repo1.dso.mil/platform-one/big-bang/apps/library-charts/gluon/-/blob/master/docs/bb-package-readme.md).

7. Push up your changes, add upgrade notices if applicable, validate that CI passes.    
    - If there are any failures, follow the information in the pipeline to make the necessary updates.
    - Add the `debug` label to the MR for more detailed information.
    - Reach out to the CODEOWNERS if needed. 

8.  As part of your MR that modifies bigbang packages, you should modify the bigbang  [bigbang/tests/test-values.yaml](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/tests/test-values.yaml?ref_type=heads) against your branch for the CI/CD MR testing by enabling your packages. 

    - To do this, at a minimum, you will need to follow the instructions at [bigbang/docs/developer/test-package-against-bb.md](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/docs/developer/test-package-against-bb.md?ref_type=heads) with changes for Jaeger enabled (the below is a reference, actual changes could be more depending on what changes where made to Jaeger in the pakcage MR).

### [test-values.yaml](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/tests/test-values.yaml?ref_type=heads)
    ```yaml
    jaeger:
      enabled: true
      git:
        tag: null
        branch: <my-package-branch-that-needs-testing>
      values:
        istio:
          hardened:
            enabled: true
      ### Additional compononents of Jaeger should be changed to reflect testing changes introduced in the package MR
    ``` 

9. Perform the steps below for manual testing. CI provides a good set of basic smoke tests but it is beneficial to run some additional checks.

# Manual Testing for Updates

> NOTE: For these testing steps it is good to do them on both a clean install and an upgrade. For clean install, point jaeger to your branch. For an upgrade do an install with jaeger pointing to the latest tag, then perform a helm upgrade with jaeger pointing to your branch.

You will want to install with:
- Jaeger, Logging (elastic, eck operator, and fluentbit), Kiali, Authservice, Monitoring and Istio packages enabled
- Tempo disabled
- [Dev SSO values](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/docs/assets/configs/example/dev-sso-values.yaml) for Kiali, Monitoring, and Jaeger

`overrides/jaeger.yaml`
```yaml
flux:
  interval: 1m
  rollback:
    cleanupOnFail: false

istioOperator:
  enabled: true

istio:
  enabled: true

elasticsearchKibana:
  enabled: true

eckOperator:
  enabled: true

fluentbit:
  enabled: true

monitoring:
  enabled: true
  sso:
    enabled: true
    prometheus:
      client_id: platform1_a8604cc9-f5e9-4656-802d-d05624370245_bb8-prometheus
    alertmanager:
      client_id: platform1_a8604cc9-f5e9-4656-802d-d05624370245_bb8-alertmanager

jaeger:
  enabled: true
  git:
    tag: null
    branch: "renovate/ironbank"
  sso:
    enabled: true
    client_id: platform1_a8604cc9-f5e9-4656-802d-d05624370245_bb8-jaeger

kiali:
  enabled: true
  sso:
    enabled: true
    client_id: platform1_a8604cc9-f5e9-4656-802d-d05624370245_bb8-kiali

tempo:
  enabled: false

addons:
  authservice:
    enabled: true
```

Testing Steps:
- Login with SSO to Jaeger (if you are not prompted for an SSO login, this could indicate a problem with the authservice connection)
- On the search fields on the left pick a service and click `find traces`. 
    - Validate that traces load.
- Navigate to Kiali and login with SSO 
    - Under applications find the namespace and service that corresponds with the service you picked in Jaeger earlier. 
    - Validate that traces show under the traces tab.
- Navigate to Prometheus 
    - Validate that the Jaeger operator targets show as `UP`.

> When in doubt with any testing or upgrade steps ask one of the CODEOWNERS for assistance.

# Modifications made to upstream chart

This is a high-level list of modifications that Big Bang has made to the upstream helm chart. You can use this as as cross-check to make sure that no modifications were lost during the upgrade process.

## chart/templates/bigbang

- Files added to support networkPolicies, cert generation, monitoring, mTLS enforcement, VirtualService, etc

## chart/Chart.yaml

- Chart renamed jaeger
- Append `-bb.x` versioning to version
- Add gluon dependency chart for helm tests (also run `helm dependency update ./chart` to store this):
    ```yaml
    dependencies:
    - name: gluon
        version: 0.3.1
        repository: oci://registry.dso.mil/platform-one/big-bang/apps/library-charts/gluon
    ```
- Add bigbang dev annotation for release automation:
    ```yaml
    annotations:
      bigbang.dev/applicationVersions: |
        - Jaeger: 1.34.1
    ```

## chart/templates/_helpers.tpl

- Line 49-54 Added selector label template to support upgrades
    ```yaml
    name: {{ include "jaeger-operator.fullname" . }}
    {{- end }}

    {{/* Generate selector labels -- see issue #512.  This allows helm upgrades to happen */}}
    {{- define "jaeger-operator.selector.labels" }}
    app.kubernetes.io/name: {{ include "jaeger-operator.name" . }}
    ```

## chart/templates/deployment.yaml

- Line 13-15 Upgrade strategy added below `spec.replicas`:
    ```yaml
    {{- if .Values.operatorUpdateStrategy }}
    strategy:
      {{- toYaml .Values.operatorUpdateStrategy | nindent 4 }}
    ```
- Line 19
    ```yaml
    {{ include "jaeger-operator.selector.labels" . | nindent 6 }}
    ```
- Updated templating to include `tpl` for `metadata.labels` and `spec.template.metadata.labels`, line 9 and 26
    ```yaml
    {{ tpl (. | toYaml | indent 4) $ }}
    ```
- Line 28-31 Annotations values added below `extraLabels`:
    ```yaml
    {{- if .Values.annotations }}
    annotations:
      {{ toYaml .Values.annotations | nindent 8 }}
    {{- end }}
    ```
- LIne 56-59 `spec.template.spec.containers` added securityContext
    ```yaml
    securityContext:
    capabilities:
        drop:
        - ALL
    ```
- Line 62 Changed `ports: name: metrics` to `http-metrics`

## chart/templates/jaeger.yaml

- Changed name to `jaeger`
- Refactored to support certain parts of the spec rather than a simple toYaml (should we re-evaluate this?)
- added `{{- if .Values.elasticsearch.enabled }}` code block
Line 9-46
```yaml
  serviceAccount: {{ include "jaeger-operator.serviceAccountName" $ }}
  strategy: {{ .strategy }}
  ingress:
{{ toYaml .ingress | indent 4 }}
  annotations:
{{ toYaml .annotations | indent 4 }}
  labels:
{{ toYaml .labels | indent 4 }}
  query:
{{ toYaml .query | indent 4 }}
  allInOne:
{{ toYaml .allInOne | indent 4 }}
  collector:
{{ toYaml .collector | indent 4 }}
{{- end }}
{{- if .Values.elasticsearch.enabled  }}
  storage:
    type: elasticsearch
    {{- if .Values.elasticsearch.storage.options.es }}
    options:
      es:
        {{- tpl (toYaml .Values.elasticsearch.storage.options.es) . | nindent 8 }}
    {{- end }}
    esIndexCleaner:
      image: {{ .Values.retention.image }}
      schedule: {{ .Values.retention.schedule }}
      numberOfDays: {{ .Values.retention.days }}
      enabled: {{ .Values.retention.enabled }}
    secretName: jaeger-secret
  volumeMounts:
    - name: certificates
      mountPath: /es/certificates/
      readOnly: true
  volumes:
    - name: certificates
      secret:
        secretName: elasticsearch-certificates
{{ end }}
```

## chart/templates/psp.yaml

- Line 36-42 added `spec.securityContext` code block
```yaml
  securityContext:
    runAsNonRoot: true
    runAsUser: 1001
    runAsGroup: 1001
    capabilities:
      drop:
        - ALL
```

## chart/templates/role.yaml
- Line 228 add `ingressclasses` to `apiGroups.resources:`
```yaml
- apiGroups:
  - networking.k8s.io
  resources:
  - ingresses
  - ingressclasses
```

## chart/templates/service.yaml

- Line 17 Changed `spec.ports` `-name: metrics` to `http-metrics`

## chart/templates/tests

- Gluon cypress test template added

## chart/tests

- Cypress config and test added

## chart/values.yaml

- Substantial values additions/changes to use IB images, support BB core interactions, etc
- When in doubt ask about these changes
- default nameOverride added and set to original chart name jaeger-operator

Line 5-6 Chart `nameOverride`
```
# -- Chart name override
nameOverride: jaeger-operator
```

Line 9-11 set `openshift`
```
# -- Openshift toggle, only affects networkPolicies
openshift:
  enabled: false
```

Line 13-15 set `sso`
```
# -- SSO toggle, only affects auth policies
sso:
  enabled: false
```

Line 17-22 set `monitoring`
```
# -- Monitoring toggle, affects servicemonitor and networkPolicies
monitoring:
  enabled: false
  serviceMonitor:
    scheme: ""
    tlsConfig: {}
```

Line 24-80 set `istio`
```
# -- Domain to service Jaeger virtualService
domain: bigbang.dev

istio:
  # -- Toggle istio integration
  enabled: false
  hardened:
    enabled: false
    outboundTrafficPolicyMode: "REGISTRY_ONLY"
    customServiceEntries: []
      # - name: "allow-google"
      #   enabled: true
      #   spec:
      #     hosts:
      #       - "www.google.com"
      #       - "google.com"
      #     location: MESH_EXTERNAL
      #     ports:
      #       - number: 443
      #         protocol: TLS
      #         name: https
      #     resolution: DNS
    customAuthorizationPolicies: []
    # - name: "allow-nothing"
    #   enabled: true
    #   spec: {}
    prometheus:
      enabled: true
      namespaces:
        - monitoring
      principals:
        - cluster.local/ns/monitoring/sa/monitoring-grafana
        - cluster.local/ns/monitoring/sa/monitoring-monitoring-kube-alertmanager
        - cluster.local/ns/monitoring/sa/monitoring-monitoring-kube-operator
        - cluster.local/ns/monitoring/sa/monitoring-monitoring-kube-prometheus
        - cluster.local/ns/monitoring/sa/monitoring-monitoring-kube-state-metrics
        - cluster.local/ns/monitoring/sa/monitoring-monitoring-prometheus-node-exporter
    tempo:
      enabled: false
      namespaces:
      - tempo
      principals:
      - cluster.local/ns/tempo/sa/tempo-tempo
  jaeger:
    # -- Toggle vs creation
    enabled: true
    annotations: {}
    labels: {}
    gateways:
      - istio-system/main
    hosts:
      - tracing.{{ .Values.domain }}
  # -- Default jaeger peer authentication
  mtls:
    # -- STRICT = Allow only mutual TLS traffic,
    # PERMISSIVE = Allow both plain text and mutual TLS traffic
    mode: STRICT
```

Line 82-88 set `cleanSvcMonitor`
```
# -- Only needed for upgrade from pre-1.29.x,
# Deletes the servicemonitor that targetted deprecated metrics endpoints
cleanSvcMonitor:
  enabled: false
  image:
    repository: registry1.dso.mil/ironbank/big-bang/base
    tag: 2.1.0
```

Line 90-121 set `webhookCertGen`
```
# -- Job to generate and patch webhooks with certificate
webhookCertGen:
  # -- If disabled must use cert manager and manually patch webhook
  enabled: true
  image:
    repository: registry1.dso.mil/ironbank/opensource/ingress-nginx/kube-webhook-certgen
    tag: v1.3.0
    pullPolicy: IfNotPresent
  resources:
    limits:
      cpu: 50m
      memory: 50Mi
    requests:
      cpu: 50m
      memory: 50Mi
  cleanupProxy:
    image:
      repository: registry1.dso.mil/ironbank/big-bang/base
      tag: 2.1.0
      pullPolicy: IfNotPresent
  nodeSelector: {}
  affinity: {}
  tolerations: {}
  securityContext:
    runAsNonRoot: true
    runAsUser: 65532
    runAsGroup: 65532
  # Adds securityContext to webhookCertJob containers
  containerSecurityContext:
    capabilities:
      drop:
        - ALL
```

Line 123-159 set `elasticsearch`
```
elasticsearch:
  enabled: false
  # -- Custom BB job to create required index templates for ES 8.x
  indexTemplateCreation:
    enabled: true
    image:
      repository: registry1.dso.mil/ironbank/big-bang/base
      tag: 2.1.0
    # -- Priority to add to the service index template, cannot conflict with existing templates
    servicePriority: 10
    # -- Priority to add to the span index template, cannot conflict with existing templates
    spanPriority: 11
    # Adds securityContext for job jaeger-es-index-template
    securityContext:
      runAsNonRoot: true
      runAsUser: 1001
      runAsGroup: 1001
    # Adds containerSecurityContext for job jaeger-es-index-template
    containerSecurityContext:
      capabilities:
        drop:
          - ALL
  username: elastic
  name: logging-ek
  namespace: logging
  # password:
  storage:
    options:
      # A complete list of Jaeger-ElasticSearch options is available here: https://github.com/jaegertracing/documentation/blob/master/data/cli/1.28/jaeger-query-elasticsearch.yaml
      es:
        server-urls: "https://{{ $.Values.elasticsearch.name }}-es-http.{{ $.Values.elasticsearch.namespace }}.svc:9200"
        tls:
          enabled: "true"
          ca: /es/certificates/ca.crt
        # Overrides to support ES 8
        version: 7
        create-index-templates: false
```

Line 161-165 set the `retention`
```
retention:
  enabled: false
  schedule: "0 * * * *"
  days: 5
  image: registry1.dso.mil/ironbank/opensource/jaegertracing/jaeger-es-index-cleaner:1.57.0
```

Line 167-169 Set the `operatorUpdateStrategy`
```
# This section will be used to configure the operator upgrade strategy in the deployment.yaml
operatorUpdateStrategy:
  type: RollingUpdate
```

Line 171-176 set the repository to `registry1.dso.mil/ironbank`
```
image:
  repository: registry1.dso.mil/ironbank/opensource/jaegertracing/jaeger-operator
  tag: 1.57.0
  pullPolicy: Always
  imagePullSecrets:
    - private-registry
```

line 178-185 ensure that `certs.issuer.create` and `certs.certificate.create` is set to `true`. Set `certs.certificate.secretName` to `jaeger-operator-webhook-cert`
```
certs:
  issuer:
    create: false
    name: ""
  certificate:
    create: false
    namespace: ""
    secretName: "jaeger-operator-webhook-cert"
```

Line 204 set `jaeger.create` to true
```
jaeger:
  # Specifies whether Jaeger instance should be created
  create: true
```

Line 207-319 set `jaeger.spec`
```
  spec:
    # allInOne for dev purposes
    # production for HA setup
    strategy: allInOne
    # Disable ingress by default in favor of istio
    ingress:
      enabled: false
    annotations: {}
    labels: {}
    allInOne:
      image: registry1.dso.mil/ironbank/opensource/jaegertracing/all-in-one:1.57.0
      options:
        log-level: info
        collector:
          zipkin:
            host-port: ":9411"
      annotations:
        sidecar.istio.io/inject: "true"
        traffic.sidecar.istio.io/includeInboundPorts: "16686"
      resources:
        requests:
          cpu: 200m
          memory: 128Mi
        limits:
          cpu: 200m
          memory: 128Mi
      securityContext:
        runAsNonRoot: true
        runAsUser: 1001
        runAsGroup: 1001
      containerSecurityContext:
        capabilities:
          drop:
            - ALL
      strategy:
        type: RollingUpdate
    agent:
      maxReplicas: 5
      image: registry1.dso.mil/ironbank/opensource/jaegertracing/jaeger-agent:1.57.0
      options:
        log-level: info
      imagePullSecrets:
        - private-registry
      securityContext:
        runAsNonRoot: true
        runAsUser: 1001
        runAsGroup: 1001
      containerSecurityContext:
        capabilities:
          drop:
            - ALL
      strategy:
        type: RollingUpdate
    ingester:
      maxReplicas: 5
      image: registry1.dso.mil/ironbank/opensource/jaegertracing/jaeger-ingester:1.57.0
      options:
        log-level: info
      securityContext:
        runAsNonRoot: true
        runAsUser: 1001
        runAsGroup: 1001
      containerSecurityContext:
        capabilities:
          drop:
            - ALL
      strategy:
        type: RollingUpdate
    query:
      replicas: 5
      image: registry1.dso.mil/ironbank/opensource/jaegertracing/jaeger-query:1.57.0
      options:
        log-level: info
      securityContext:
        runAsNonRoot: true
        runAsUser: 1001
        runAsGroup: 1001
      containerSecurityContext:
        capabilities:
          drop:
            - ALL
      strategy:
        type: RollingUpdate
    collector:
      maxReplicas: 5
      image: registry1.dso.mil/ironbank/opensource/jaegertracing/jaeger-collector:1.57.0
      options:
        log-level: info
      resources:
        requests:
          cpu: 200m
          memory: 128Mi
        limits:
          cpu: 200m
          memory: 128Mi
      securityContext:
        runAsNonRoot: true
        runAsUser: 1001
        runAsGroup: 1001
      containerSecurityContext:
        capabilities:
          drop:
            - ALL
      strategy:
        type: RollingUpdate
    volumeMounts:
      - name: certificates
        mountPath: /es/certificates/
        readOnly: true
    volumes:
      - name: certificates
        secret:
          secretName: elasticsearch-certificates
```

Line 321-325 set `rbac.clusterRole` to true
```
rbac:
  # Specifies whether RBAC resources should be created
  create: true
  pspEnabled: false
  clusterRole: true
```

Line 334-339 set `serviceAccount.name` to `jaeger-instance`
```
serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name: jaeger-instance
  # Annotations for serviceAccount
  annotations: {}
```

Line 364-370 set `resources`
```
resources:
  limits:
    cpu: 100m
    memory: 128Mi
  requests:
    cpu: 100m
    memory: 128Mi
```

Line 380-383 set `securityContext`
```
securityContext:
  runAsNonRoot: true
  runAsUser: 1001
  runAsGroup: 1001
```

Line 394-413 set `annotations`, `networkPolicies`, `bbtests`, values
```
# additional BB additions
annotations:
  {}
  # bigbang.dev/istioVersion: 1.10.3

networkPolicies:
  enabled: false
  ingressLabels:
    app: istio-ingressgateway
    istio: ingressgateway
  # See `kubectl cluster-info` and then resolve to IP
  controlPlaneCidr: 0.0.0.0/0
  additionalPolicies: []

bbtests:
  enabled: false
  cypress:
    artifacts: true
    envs:
      cypress_url: "http://jaeger-query:16686"
```

### automountServiceAccountToken
The mutating Kyverno policy named `update-automountserviceaccounttokens` is leveraged to harden all ServiceAccounts in this package with `automountServiceAccountToken: false`. This policy is configured by namespace in the Big Bang umbrella chart repository at [chart/templates/kyverno-policies/values.yaml](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/chart/templates/kyverno-policies/values.yaml?ref_type=heads). 

This policy revokes access to the K8s API for Pods utilizing said ServiceAccounts. If a Pod truly requires access to the K8s API (for app functionality), the Pod is added to the `pods:` array of the same mutating policy. This grants the Pod access to the API, and creates a Kyverno PolicyException to prevent an alert.
