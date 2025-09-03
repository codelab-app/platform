# Consul-Template configuration for Docker
# Manages Docker container orchestration
#
# This config tells consul-template:
# 1. Watch Consul KV store for any keys referenced in docker-compose.ctmpl
# 2. When those keys change, regenerate docker-compose.yml
# 3. Execute 'docker-compose up -d' to apply the new configuration
# 4. This ensures containers are always running with the latest Consul config

consul {
  address = "127.0.0.1:8500"
  retry {
    enabled = true
    attempts = 12
    backoff = "250ms"
    max_backoff = "1m"
  }
}

# Docker Compose template for service containers
template {
  # Source: Template file with Consul placeholders like {{ key "config/docker/api_tag_version" }}
  source = "/etc/consul-template/docker-compose.ctmpl"
  
  # Destination: Where to write the rendered docker-compose.yml
  destination = "/root/docker/docker-compose.yml"
  
  perms = 0644
  backup = true
  
  # Command executed AFTER the file is updated
  # This recreates/restarts containers with new configuration
  # --pull always: Pull latest images if version changed
  # --remove-orphans: Remove containers no longer defined in compose file
  command = "cd /root/docker && docker-compose up -d --pull always --remove-orphans"
  command_timeout = "60s"
  
  wait {
    min = "2s"
    max = "10s"
  }
}

# Log to syslog
syslog {
  enabled = true
  facility = "LOCAL0"
}

# Kill signal for graceful shutdown
kill_signal = "SIGINT"

# Reload signal for configuration changes
reload_signal = "SIGHUP"