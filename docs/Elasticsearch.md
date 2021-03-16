# Elasticsearch


## Cleanup Schedule

The data being stored in elasticsearch is cleaned at a cron schedule.  The following yaml would have the index clean up job run every hour and keep 5 days of data.

```yaml
retention:
  enabled: true
  schedule: "0 * * * *"
  days: 5
```
