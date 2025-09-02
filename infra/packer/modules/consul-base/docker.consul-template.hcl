# Consul-Template configuration for Docker
# Manages both Docker daemon configuration and container orchestration

consul {
  address = "127.0.0.1:8500"
  retry {
    enabled = true
    attempts = 12
    backoff = "250ms"
    max_backoff = "1m"
  }
}

# Docker daemon configuration template
# This must be processed first as containers depend on daemon settings
template {
  source = "/etc/consul-template/daemon.json.ctmpl"
  destination = "/etc/docker/daemon.json"
  perms = 0644
  backup = true
  
  # Restart Docker when daemon.json changes
  command = "systemctl reload docker || systemctl restart docker"
  command_timeout = "30s"
  
  wait {
    min = "2s"
    max = "10s"
  }
}

# Docker Compose template for service containers
# Processed after daemon configuration to ensure Docker is ready
template {
  source = "/etc/consul-template/docker-compose.ctmpl"
  destination = "/root/docker/docker-compose.yml"
  perms = 0644
  backup = true
  
  # Pull latest images and restart Docker containers when configuration changes
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