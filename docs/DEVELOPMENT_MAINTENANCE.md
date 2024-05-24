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

8. Perform the steps below for manual testing. CI provides a good set of basic smoke tests but it is beneficial to run some additional checks.

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

- Added selector label template to support upgrades
    ```yaml
    # Generate selector labels -- see issue #512. This allows helm upgrades to happen
    {{- define "jaeger-operator.selector.labels" }}
    app.kubernetes.io/name: {{ include "jaeger-operator.name" . }}
    {{- end }}
    ```
- Added `name: {{ include "jaeger-operator.fullname" . }}` to `"jaeger-operator.labels"` template

## chart/templates/deployment.yaml

- Upgrade strategy added below `spec.replicas`:
    ```yaml
    {{- if .Values.operatorUpdateStrategy }}
    strategy:
      {{- toYaml .Values.operatorUpdateStrategy | nindent 4 }}
    {{- end }}
    ```
- `spec.selector.matchLabels` changed to `{{ include "jaeger-operator.selector.labels" . | nindent 6 }}`
- Annotations values added below `extraLabels`:
    ```yaml
    {{- if .Values.annotations }}
    annotations:
      {{ toYaml .Values.annotations | nindent 8 }}
    {{- end }}
    ```
- `spec.template.spec.containers` added securityContext
    ```yaml
    securityContext:
    capabilities:
        drop:
        - ALL
    ```
- Changed `ports: name: metrics` to `http-metrics`

## chart/templates/jaeger.yaml

- Changed name to `jaeger`
- Refactored to support certain parts of the spec rather than a simple toYaml (should we re-evaluate this?)
- added `{{- if .Values.elasticsearch.enabled }}` code block

## chart/templates/psp.yaml

- added `spec.securityContext` code block

## chart/templates/service.yaml

- Changed `spec.ports` `-name: metrics` to `http-metrics`

## chart/templates/tests

- Gluon cypress test template added

## chart/tests

- Cypress config and test added

## chart/values.yaml

- Substantial values additions/changes to use IB images, support BB core interactions, etc
- When in doubt ask about these changes
- default nameOverride added and set to original chart name jaeger-operator

### automountServiceAccountToken
The mutating Kyverno policy named `update-automountserviceaccounttokens` is leveraged to harden all ServiceAccounts in this package with `automountServiceAccountToken: false`. This policy is configured by namespace in the Big Bang umbrella chart repository at [chart/templates/kyverno-policies/values.yaml](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/chart/templates/kyverno-policies/values.yaml?ref_type=heads). 

This policy revokes access to the K8s API for Pods utilizing said ServiceAccounts. If a Pod truly requires access to the K8s API (for app functionality), the Pod is added to the `pods:` array of the same mutating policy. This grants the Pod access to the API, and creates a Kyverno PolicyException to prevent an alert.
