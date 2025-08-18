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
 * Data source to find the latest Packer-built Codelab app base image
 * The Consul server can use the app base image since it doesn't need database tools
 */
data "digitalocean_image" "codelab_app_base" {
  name_regex = "^codelab-app-base-.*"
  region     = var.digitalocean_region
  most_recent = true
}

/**
 * Consul Server Droplet
 * 
 * Uses the Packer-built image and configures Consul as a server at runtime.
 * The user_data script configures Consul server mode and starts the service.
 */
resource "digitalocean_droplet" "consul_server" {
  image  = data.digitalocean_image.codelab_app_base.id
  name   = "consul-server"
  region = var.digitalocean_region
  size   = "s-1vcpu-1gb"
  
  backups    = true
  monitoring = true
  ipv6       = true
  
  vpc_uuid = var.vpc_id
  
  ssh_keys = var.ssh_keys
  
  # No user_data needed - configuration is baked into the image!
  # The Packer image already knows this is a consul-server from the hostname
  
  lifecycle {
    create_before_destroy = true
    ignore_changes = []
  }
  
  droplet_agent = true
}

/**
 * Spaces bucket for Consul backups
 */
resource "digitalocean_spaces_bucket" "consul_backups" {
  name   = "codelab-consul-backups"
  region = var.digitalocean_region
  acl    = "private"
  
  lifecycle_rule {
    enabled = true
    expiration {
      days = 30
    }
  }
}