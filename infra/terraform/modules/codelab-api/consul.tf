# Manage Consul KV configuration for API service
resource "consul_keys" "api_config" {
  # API-specific configuration
  key {
    path  = "config/docker/api_tag_version"
    value = var.docker_tag_version
  }
  
  key {
    path  = "config/api/port"
    value = var.next_public_api_port
  }
  
  key {
    path  = "config/api/hostname"
    value = local.api_protocol == "https" ? "https://${digitalocean_droplet.codelab_api.name}" : "http://${digitalocean_droplet.codelab_api.name}"
  }
  
  key {
    path  = "config/api/base_path"
    value = var.next_public_base_api_path
  }
  
  # API dependencies
  key {
    path  = "config/api/neo4j_uri"
    value = var.neo4j_uri
  }
  
  key {
    path  = "config/api/neo4j_user"
    value = var.neo4j_user
  }
  
  key {
    path  = "config/api/neo4j_password"
    value = var.neo4j_password
  }
  
  # Auth0 configuration for API
  key {
    path  = "config/api/auth0_domain"
    value = var.auth0_domain
  }
  
  # Loki configuration for API logging
  key {
    path  = "config/api/loki_url"
    value = var.loki_url
  }
}