# Manage Consul KV configuration for Sites service
resource "consul_keys" "sites_config" {
  # Sites-specific configuration
  key {
    path  = "config/docker/sites_tag_version"
    value = var.docker_tag_version
  }
  
  key {
    path  = "config/sites/port"
    value = "3000"
  }
  
  key {
    path  = "config/sites/web_host"
    value = var.next_public_web_host
  }
  
  # Sites dependencies - API connection
  key {
    path  = "config/sites/api_hostname"
    value = var.next_public_api_hostname
  }
  
  key {
    path  = "config/sites/api_port"
    value = var.next_public_api_port
  }
  
  key {
    path  = "config/sites/api_base_path"
    value = var.next_public_base_api_path
  }
  
  # Loki configuration for Sites logging
  key {
    path  = "config/sites/loki_url"
    value = var.loki_url
  }
}