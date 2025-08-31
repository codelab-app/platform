/**
 * API Droplet using Packer-built base image
 */

# Find the latest Packer-built API-specific base image
data "digitalocean_images" "codelab_api_base" {
  filter {
    key      = "name"
    values   = ["codelab-api-base"]
    match_by = "substring"
  }
  filter {
    key    = "regions"
    values = [var.digitalocean_region]
  }
  filter {
    key    = "private"
    values = ["true"]
  }
  sort {
    key       = "created"
    direction = "desc"
  }
}

resource "digitalocean_droplet" "codelab_api" {
  image  = data.digitalocean_images.codelab_api_base.images[0].id
  name   = "api"
  region = var.digitalocean_region
  size   = "s-1vcpu-1gb-intel"

  backups    = true
  monitoring = true
  ipv6       = true

  vpc_uuid = var.codelab_app_vpc_id

  ssh_keys = ["31:0e:90:12:06:a2:9f:8b:07:0e:a8:49:cc:d8:1f:71"]

  # Tags for firewall rules
  tags = ["consul-client"]

  # No user_data needed - everything is configured via:
  # 1. Hostname (api) determines service type
  # 2. Private networking for Consul discovery
  # 3. Secrets in Consul KV (populated separately)

  lifecycle {
    ignore_changes = []
  }

  droplet_agent = true
}

locals {
  enable_ssl   = false
  api_protocol = local.enable_ssl ? "https" : "http"
}

output "codelab_api_hostname" {
  value = "${local.api_protocol}://${digitalocean_droplet.codelab_api.name}"
}