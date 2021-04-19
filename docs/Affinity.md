#  Affinity

Jaeger pods can be dedicated to specific pods by leveraging the affinity field for each component via the values file.  See [Here](https://www.jaegertracing.io/docs/1.22/operator/#finer-grained-configuration) for more information

```yaml

jaeger:
    spec:
    # sets affinity for all jaeger components
        affinity:
            nodeAffinity:
            requiredDuringSchedulingIgnoredDuringExecution:
                nodeSelectorTerms:
                - matchExpressions:
                - key: kubernetes.io/e2e-az-name
                    operator: In
                    values:
                    - e2e-az1
                    - e2e-az2
            preferredDuringSchedulingIgnoredDuringExecution:
            - weight: 1
                preference:
                matchExpressions:
                - key: another-node-label-key
                    operator: In
                    values:
                    - another-node-label-value
        # sets toleration for all jaeger components
        tolerations:
        - key: "key1"
        operator: "Equal"
        value: "value1"
        effect: "NoSchedule"
        - key: "key1"
        operator: "Equal"
        value: "value1"
        effect: "NoExecute"
      
    allInOne:
      # sets affinity for just allInOne component
      affinity: ...
      # sets tolerations for just allInOne component
      tolerations: ...
```


