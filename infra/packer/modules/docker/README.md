# Docker Module

## Logging Configuration

### Why we use json-file driver instead of Loki driver

The Docker daemon is configured to use the `json-file` logging driver (Docker's default) rather than the Loki driver. This is intentional:

#### With Loki driver (previous approach):
```json
{
  "log-driver": "loki",
  "log-opts": {
    "loki-url": "{{ key "config/loki/url" }}",
    "loki-batch-size": "400"
  }
}
```
- **Problem**: Logs are ONLY sent to remote Loki server
- **No local files** are created at `/var/lib/docker/containers/*/`
- `docker logs` command may not work
- Logs lost if Loki is unavailable or network issues occur

#### With json-file driver + Alloy (current approach):
```json
{
  "log-driver": "json-file",  // Optional since it's the default
  "log-opts": {
    "max-size": "10m",
    "max-file": "3",
    "labels": "container_name"
  }
}
```
- Logs are written to local files at `/var/lib/docker/containers/<container-id>/<container-id>-json.log`
- Grafana Alloy reads logs via Docker API and forwards to Loki
- **Result**: Dual logging - logs stored both locally AND in Loki

### Benefits of dual logging:
1. **Reliability**: Local logs persist even if Loki is down
2. **Debugging**: Can inspect logs directly on host with `docker logs` or by reading files
3. **No data loss**: Network issues don't cause log loss
4. **Performance**: Can grep/search local logs without querying Loki

### How it works:
```
Container → Docker Daemon → Local JSON files (/var/lib/docker/containers/*)
            ↓
         Docker API
            ↓
      Grafana Alloy → Loki (remote)
```

Both destinations receive the same logs - local files for immediate access and Loki for centralized log management.