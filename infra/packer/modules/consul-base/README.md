# Consul-Base Module

## Overview

This module provides the base Consul configuration and Consul-Template orchestration for managing Docker containers dynamically based on Consul key-value store.

## How Consul-Template Orchestration Works

### Key Components

1. **docker.consul-template.hcl** - Consul-Template configuration that:
   - Watches for changes in Consul KV store
   - Renders docker-compose.yml from templates
   - Automatically updates running containers when configuration changes

2. **docker-consul-template.service** - Systemd service that:
   - Runs consul-template as a long-running daemon process
   - Uses the docker.consul-template.hcl configuration explicitly via `-config` flag
   - Note: The `.hcl` extension is NOT auto-discovered - it must be explicitly specified

3. **alloy.consul-template.hcl** - Similar configuration for Grafana Alloy:
   - Renders Alloy configuration from template
   - Reloads Alloy service when Loki endpoints change

### The Flow

```
Consul KV Store → Consul-Template → Renders docker-compose.yml → Runs docker-compose up -d
                       ↑                                              ↓
                  (watches for changes)                    (updates containers)
```

1. **Template Processing**:
   - Source: `/etc/consul-template/docker-compose.ctmpl` (contains `{{ key "..." }}` placeholders)
   - Destination: `/root/docker/docker-compose.yml` (rendered with actual values)
   - On change: Executes `docker-compose up -d --pull always --remove-orphans`

2. **Dynamic Updates**:
   - When Consul KV values change (e.g., `config/docker/landing_tag_version`)
   - Consul-Template detects the change via Consul's blocking queries
   - Re-renders the docker-compose.yml with new values
   - Runs the command to update containers (pulls new images, recreates containers)

### Example Consul Keys Used

- `config/domain` - Base domain for services
- `config/docker/landing_tag_version` - Docker image tag for landing service  
- `config/loki/url` - Loki endpoint for log forwarding
- `config/landing/port` - Port configuration for services

### Why Consul-Template Instead of Simple Systemd?

While a basic systemd service could run `docker-compose up -d`, consul-template provides:

1. **Dynamic Templating** - Replaces `{{ key "config/..." }}` with live Consul values
2. **Event-Driven Updates** - Only acts when values actually change (not polling)
3. **Atomic Operations** - Creates backups, validates rendering, then updates
4. **Built-in Retry Logic** - Handles Consul connection failures gracefully
5. **Idempotency** - Won't restart containers if rendered file hasn't changed

Without consul-template, you would need:
- Hardcoded values in docker-compose.yml (no central configuration)
- Manual container restarts when configuration changes
- Custom scripts to fetch values from Consul
- Polling mechanisms or manual triggers for updates

### Configuration Details

The `docker.consul-template.hcl` configuration includes:

- **Consul connection**: Connects to local agent at `127.0.0.1:8500`
- **Retry logic**: Up to 12 attempts with exponential backoff
- **Wait timers**: 2-10 seconds to batch rapid changes
- **Backup**: Keeps previous docker-compose.yml before overwriting
- **Timeout**: 60 seconds for docker-compose operations

### Adding New Consul-Template Configurations

To add a new consul-template configuration:

1. Create the `.hcl` configuration file in this module
2. Copy it to `/etc/consul-template/` in the playbook
3. Create a systemd service that runs: `consul-template -config=/etc/consul-template/your-config.hcl`
4. Enable and start the service

Note: Each consul-template configuration needs its own service - they are not auto-discovered by extension.