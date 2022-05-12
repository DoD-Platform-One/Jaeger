# How to upgrade the Jaeger Package chart

Jaeger is a modified/customized version of an upstream chart, however, due to current maintenance issues of the upstream charts, it is currently being updated manually via manifests. The below details the steps required to update to a new version of the Jaeger package.

1. Navigate to the [Jaeger releases](https://github.com/jaegertracing/jaeger-operator/releases) and find the release that corresponds to the targeted update version available in Iron Bank and download the manifests file.  Keep the file on hand for later. (Note it will download as a "jaeger-operator.yaml" file)

2. Checkout the `renovate/ironbank` branch. This branch will already have the updates you need for the images.

3. Compare the manifests file you downloaded previously to the `chart/crds/crd.yaml` file.  You will add the changes that appear in the manifest file to the crd.yaml file until you reach the first helm separation (You will see "---") which separates the crd portion from other components in the file (examples: Role, RoleBinding, Service, Deployment, etc.)

4. Compare each additional component to its corresponding component in `chart\templates` and make changes as necessary (Note: because of formatting, it may also help to download the previous manifest file that corresponds to the version of jaeger you are updating from, and see if any changes have been made to these sections)

5. Update all images in values.yaml to the target version

6. Modify the `version` in `Chart.yaml` - to a new minor version.
    ```yaml
    apiVersion: v1
    description: jaeger-operator Helm chart for Kubernetes
    name: jaeger-operator
    version: x.xx.x-bb.x
    appVersion: x.xx.x
    home: https://www.jaegertracing.io/
    icon: https://www.jaegertracing.io/img/jaeger-icon-reverse-color.svg
    sources:
    - https://github.com/jaegertracing/jaeger-operator
    dependencies:
    - name: gluon
        version: 0.2.8
        repository: oci://registry.dso.mil/platform-one/big-bang/apps/library-charts/gluon
    annotations:
    bigbang.dev/applicationVersions: |
        - Jaeger: x.xx.x
    ```

7. Update `CHANGELOG.md` adding an entry for the new version and noting all changes (at minimum should include `Updated Jaeger to x.x.x`).

8. Generate the `README.md` updates by following the [guide in gluon](https://repo1.dso.mil/platform-one/big-bang/apps/library-charts/gluon/-/blob/master/docs/bb-package-readme.md).

9. Push up your changes, validate that CI passes. If there are any failures follow the information in the pipeline to make the necessary updates and reach out to the team if needed.

10. Perform the steps below for manual testing. CI provides a good set of basic smoke tests but it is beneficial to run some additional checks.

# Testing new Jaeger version

NOTE: For these testing steps it is good to do them on both a clean install and an upgrade. For clean install, point jaeger to your branch. For an upgrade do an install with jaeger pointing to the latest tag, then perform a helm upgrade with jaeger pointing to your branch.

You will want to install with:
- Jaeger, Logging (elastic, eck operator, and fluentbit), Kiali, Authservice and Monitoring packages enabled
- Istio enabled
- [Dev SSO values](https://repo1.dso.mil/platform-one/big-bang/bigbang/-/blob/master/chart/dev-sso-values.yaml) for Kiali, Monitoring, and Jaeger

Testing Steps:
- Login with SSO to Jaeger (if you are not prompted for an SSO login, this could indicate a problem with the authservice connection)
- On the search fields on the left pick a service and click "find traces". Validate that traces load.
- Navigate to Kiali and login with SSO, under applications find the namespace and service that corresponds with the service you picked in Jaeger earlier. Validate that traces show under the traces tab.
- Navigate to Prometheus and validate that the Jaeger operator targets show as UP.

When in doubt with any testing or upgrade steps ask one of the CODEOWNERS for assistance.