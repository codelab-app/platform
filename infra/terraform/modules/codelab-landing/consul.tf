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
    path  = "config/landing/container_name"
    value = "codelab-landing"
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

# Register the landing service with Consul
# This allows the reverse proxy to discover and route to this service
resource "consul_service" "landing" {
  name    = "landing"
  node    = consul_node.landing.name
  port    = 3000
  tags    = ["frontend", "production"]
  
  check {
    check_id = "landing-health"
    name     = "Landing health check"
    http     = "http://${digitalocean_droplet.codelab_landing.ipv4_address_private}:3000/health"
    interval = "10s"
    timeout  = "2s"
  }
}

# Register the node in Consul
resource "consul_node" "landing" {
  name    = "landing-${digitalocean_droplet.codelab_landing.id}"
  address = digitalocean_droplet.codelab_landing.ipv4_address_private
  
  meta = {
    "droplet_id" = digitalocean_droplet.codelab_landing.id
    "public_ip"  = digitalocean_droplet.codelab_landing.ipv4_address
    "region"     = digitalocean_droplet.codelab_landing.region
  }
}