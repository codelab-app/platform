# Manage Consul KV configuration for Landing service
resource "consul_keys" "landing_config" {
  # Landing-specific configuration
  key {
    path  = "config/docker/landing_tag_version"
    value = var.docker_tag_version
  }
  
  key {
    path  = "config/landing/port"
    value = "3000"
  }
  
  key {
    path  = "config/landing/web_host"
    value = var.next_public_web_host
  }
  
  # Loki configuration for Landing logging
  key {
    path  = "config/landing/loki_url"
    value = var.loki_url
  }
}