# Code Changes for Updates

Jaeger is a modified/customized version of an upstream chart. The below details the steps required to update to a new version of the Jaeger package.

1. Navigate to the [upstream chart repo and folder](https://github.com/jaegertracing/helm-charts/tree/main/charts/jaeger-operator) and find the tag that corresponds with the new chart version for this image update. For example, if updating the Jaeger images to 1.28 you would check the [chart values](https://github.com/jaegertracing/helm-charts/blob/main/charts/jaeger-operator/values.yaml#L7) and switch Gitlab tags until you find the latest chart version that uses 1.28 images. In this case that is [`jaeger-operator-2.27.0`](https://github.com/jaegertracing/helm-charts/blob/jaeger-operator-2.27.0/charts/jaeger-operator/values.yaml#L7) (as of this doc construction).

2. Checkout the `renovate/ironbank` branch. This branch will already have the updates you need for the images.

2. From the root of the repo run `kpt pkg update chart@jaeger-operator-2.27.0 --strategy alpha-git-patch` replacing `jaeger-operator-2.27.0` with the version tag you got in step 1. You may be prompted to resolve some conflicts - choose what makes sense (if there are BB additions/changes keep them, if there are upstream additions/changes keep them).

3. Modify the `version` in `Chart.yaml` - you will want to append `-bb.0` to the chart version from upstream.

5. Update `CHANGELOG.md` adding an entry for the new version and noting all changes (at minimum should include `Updated Jaeger to x.x.x`).

6. Generate the `README.md` updates by following the [guide in gluon](https://repo1.dso.mil/platform-one/big-bang/apps/library-charts/gluon/-/blob/master/docs/bb-package-readme.md).

8. Push up your changes, validate that CI passes. If there are any failures follow the information in the pipeline to make the necessary updates and reach out to the team if needed.

9. Perform the steps below for manual testing. CI provides a good set of basic smoke tests but it is beneficial to run some additional checks.

# Manual Testing for Updates

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
