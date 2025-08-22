/**
 * Consul Server Image for Codelab Platform
 *
 * This Packer template creates a DigitalOcean snapshot specifically
 * for the Consul server node. It extends the services base image with
 * Consul server-specific configuration.
 *
 * Key differences from client nodes:
 * - Server mode enabled
 * - Bootstrap configuration
 * - UI enabled
 * - Listens on all interfaces for API/UI access
 */

packer {
  required_plugins {
    digitalocean = {
      version = ">= 1.1.1"
      source  = "github.com/digitalocean/digitalocean"
    }
    external = {
      version = ">= 0.0.2"
      source  = "github.com/joomcode/external"
    }
  }
}

variable "do_token" {
  type        = string
  description = "DigitalOcean API Token"
  sensitive   = true
}

variable "region" {
  type        = string
  description = "DigitalOcean region to build in"
  default     = "sgp1"
}

# Use external data source to get the latest services base snapshot
data "external" "latest_services_base" {
  program = ["bash", "-c", "DO_API_TOKEN='${var.do_token}' ${path.root}/../../scripts/get-latest-snapshot.sh codelab-services-base"]
}

locals {
  base_image_id = data.external.latest_services_base.result.id
}

source "digitalocean" "consul_server" {
  api_token     = var.do_token
  droplet_name  = "packer-consul-server-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  image         = local.base_image_id
  region        = var.region
  size          = "s-1vcpu-1gb"
  ssh_username  = "root"
  snapshot_name = "codelab-consul-server-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  snapshot_regions = [var.region]
  tags          = ["packer", "consul", "server"]
}

build {
  sources = ["source.digitalocean.consul_server"]

  # Copy server configuration
  provisioner "file" {
    source      = "files/consul-server.hcl"
    destination = "/etc/consul.d/consul-server.hcl"
  }

  # Configure as server
  provisioner "shell" {
    inline = [
      "# Remove any client configuration from base image",
      "rm -f /etc/consul.d/consul-client.hcl",
      "",
      "# Set proper permissions",
      "chown consul:consul /etc/consul.d/consul-server.hcl",
      "chmod 640 /etc/consul.d/consul-server.hcl",
      "",
      "echo 'Consul server configuration complete'"
    ]
  }

  # Clean up and optimize
  provisioner "shell" {
    inline = [
      "# Clean up",
      "apt-get clean",
      "rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*",
      "",
      "# Trim filesystem to minimize snapshot size",
      "fstrim -av",
      "sync"
    ]
  }
}