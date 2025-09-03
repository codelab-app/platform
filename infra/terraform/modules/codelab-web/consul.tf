# Manage Consul KV configuration for Web service
resource "consul_keys" "web_config" {
  # Web-specific configuration
  key {
    path  = "config/docker/web_tag_version"
    value = var.docker_tag_version
  }
  
  key {
    path  = "config/web/host"
    value = var.next_public_web_host
  }
  
  key {
    path  = "config/web/port"
    value = "3000"
  }
  
  # Web dependencies - API connection
  key {
    path  = "config/web/api_hostname"
    value = var.next_public_api_hostname
  }
  
  key {
    path  = "config/web/api_port"
    value = var.next_public_api_port
  }
  
  key {
    path  = "config/web/api_base_path"
    value = var.next_public_base_api_path
  }
  
  # Auth0 configuration for Web
  key {
    path  = "config/web/auth0_domain"
    value = var.auth0_domain
  }
  
  key {
    path  = "config/web/auth0_secret"
    value = var.auth0_secret
  }
  
  key {
    path  = "config/web/auth0_web_client_id"
    value = var.auth0_web_client_id
  }
  
  key {
    path  = "config/web/auth0_web_client_secret"
    value = var.auth0_web_client_secret
  }
  
  # Loki configuration for Web logging
  key {
    path  = "config/web/loki_url"
    value = var.loki_url
  }
}