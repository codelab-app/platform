# Consul-Template configuration for Docker daemon.json
# This runs as a separate consul-template instance to manage Docker configuration

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

# Log to syslog
syslog {
  enabled = true
  facility = "LOCAL0"
}

# Kill signal for graceful shutdown
kill_signal = "SIGINT"

# Reload signal for configuration changes
reload_signal = "SIGHUP"