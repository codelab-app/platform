# Consul-Template configuration for Neo4j service

consul {
  address = "127.0.0.1:8500"
  retry {
    enabled = true
    attempts = 12
    backoff = "250ms"
    max_backoff = "1m"
  }
}

# Docker Compose template
template {
  source = "/etc/consul-template/docker-compose.ctmpl"
  destination = "/root/docker/docker-compose.yml"
  perms = 0644
  backup = true
  
  wait {
    min = "2s"
    max = "10s"
  }
}

# Caddyfile template
template {
  source = "/etc/consul-template/Caddyfile.ctmpl"
  destination = "/root/docker/Caddyfile"
  perms = 0644
  backup = true
  
  command = "cd /root/docker && docker-compose up -d --pull always --remove-orphans"
  command_timeout = "60s"
  
  wait {
    min = "2s"
    max = "10s"
  }
}

syslog {
  enabled = true
  facility = "LOCAL0"
}

kill_signal = "SIGINT"
reload_signal = "SIGHUP"