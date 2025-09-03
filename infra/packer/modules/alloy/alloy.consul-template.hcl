# Consul-Template configuration for Alloy
# Manages Alloy configuration for log shipping to Loki
#
# This config tells consul-template:
# 1. Watch Consul KV store at localhost:8500
# 2. Monitor the template file for any Consul keys it references
# 3. When those keys change, regenerate the destination file
# 4. After regeneration, execute the command to reload Alloy

consul {
  address = "127.0.0.1:8500"
  retry {
    enabled = true
    attempts = 12
    backoff = "250ms"
    max_backoff = "1m"
  }
}

# Alloy configuration template
template {
  # Source: Template file with Consul placeholders like {{ key "config/grafana/vpc_ip" }}
  source = "/etc/consul-template/config.alloy.ctmpl"
  
  # Destination: Where to write the rendered configuration
  destination = "/etc/alloy/config.alloy"
  
  perms = 0644
  backup = true
  
  # Command executed AFTER the file is updated
  # This makes Alloy reload its configuration to pick up the new Loki endpoint
  # The '|| true' prevents consul-template from exiting if reload fails
  command = "systemctl reload alloy || true"
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