# Consul-Template configuration
# Watches Consul KV store and updates Docker Compose configuration

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
  source = "/etc/consul-template/docker-compose.ctmpl"
  destination = "/root/docker/docker-compose.yml"
  perms = 0644
  backup = true
  
  # Restart Docker containers when configuration changes
  command = "cd /root/docker && docker-compose up -d --remove-orphans"
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