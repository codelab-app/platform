/**
 * Consul Server Module
 *
 * This module provisions a HashiCorp Consul server using a Packer-built image.
 * The Consul server provides centralized configuration management for all services.
 *
 * Architecture:
 * - Single Consul server (can be extended to 3-node cluster for HA)
 * - Uses Packer-built image with Consul pre-installed
 * - Runtime configuration via user_data
 *
 * Benefits over cloud-init:
 * - Faster deployment (software pre-installed)
 * - Consistent base image across all droplets
 * - Reduced deployment failures
 */

terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

/**
 * Data source to find the latest Packer-built Consul server image
 * This is a dedicated image with Consul server configuration baked in
 */
data "digitalocean_images" "codelab_consul_server" {
  filter {
    key      = "name"
    values   = ["codelab-consul-server"]
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

/**
 * Consul Server Droplet
 *
 * Uses the Packer-built image and configures Consul as a server at runtime.
 * The user_data script configures Consul server mode and starts the service.
 */
resource "digitalocean_droplet" "consul_server" {
  image  = data.digitalocean_images.codelab_consul_server.images[0].id
  name   = "consul-server"
  region = var.digitalocean_region
  size   = "s-1vcpu-1gb"

  backups    = true
  monitoring = true
  ipv6       = true

  vpc_uuid = var.vpc_id

  ssh_keys = var.ssh_keys

  droplet_agent = true
  
  tags = ["consul-server"]
}

