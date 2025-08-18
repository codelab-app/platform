packer {
  required_plugins {
    digitalocean = {
      version = ">= 1.0.0"
      source  = "github.com/hashicorp/digitalocean"
    }
  }
}

variable "do_token" {
  type        = string
  description = "DigitalOcean API Token"
  sensitive   = true
}

variable "do_region" {
  type        = string
  description = "DigitalOcean region for deployments"
  default     = "sgp1"
}

# Find the base image to build from
# Using the most specific pattern to get the latest image
# TODO: Update this pattern or use image ID directly for production
data "digitalocean-image" "app_base" {
  api_token   = var.do_token
  name_regex  = "^codelab-app-base-2025-08-18-1427$"
  region      = var.do_region
}

# Define sources for each service
source "digitalocean" "api" {
  api_token    = var.do_token
  image        = data.digitalocean-image.app_base.image_id
  region       = var.do_region
  size         = "s-2vcpu-4gb"
  ssh_username = "root"
  snapshot_name = "codelab-api-base-{{timestamp}}"
  snapshot_regions = [var.do_region]
  droplet_name = "packer-api-build-{{timestamp}}"
  tags         = ["packer", "api", "service"]
}

source "digitalocean" "web" {
  api_token    = var.do_token
  image        = data.digitalocean-image.app_base.image_id
  region       = var.do_region
  size         = "s-2vcpu-4gb"
  ssh_username = "root"
  snapshot_name = "codelab-web-base-{{timestamp}}"
  snapshot_regions = [var.do_region]
  droplet_name = "packer-web-build-{{timestamp}}"
  tags         = ["packer", "web", "service"]
}

source "digitalocean" "landing" {
  api_token    = var.do_token
  image        = data.digitalocean-image.app_base.image_id
  region       = var.do_region
  size         = "s-2vcpu-4gb"
  ssh_username = "root"
  snapshot_name = "codelab-landing-base-{{timestamp}}"
  snapshot_regions = [var.do_region]
  droplet_name = "packer-landing-build-{{timestamp}}"
  tags         = ["packer", "landing", "service"]
}

source "digitalocean" "sites" {
  api_token    = var.do_token
  image        = data.digitalocean-image.app_base.image_id
  region       = var.do_region
  size         = "s-2vcpu-4gb"
  ssh_username = "root"
  snapshot_name = "codelab-sites-base-{{timestamp}}"
  snapshot_regions = [var.do_region]
  droplet_name = "packer-sites-build-{{timestamp}}"
  tags         = ["packer", "sites", "service"]
}

source "digitalocean" "neo4j" {
  api_token    = var.do_token
  image        = data.digitalocean-image.app_base.image_id
  region       = var.do_region
  size         = "s-2vcpu-4gb"
  ssh_username = "root"
  snapshot_name = "codelab-neo4j-base-{{timestamp}}"
  snapshot_regions = [var.do_region]
  droplet_name = "packer-neo4j-build-{{timestamp}}"
  tags         = ["packer", "neo4j", "service"]
}

# Build configuration for all services
build {
  # Build all service images in parallel
  sources = [
    "source.digitalocean.api",
    "source.digitalocean.web",
    "source.digitalocean.landing",
    "source.digitalocean.sites",
    "source.digitalocean.neo4j"
  ]

  # API-specific template
  provisioner "file" {
    only        = ["digitalocean.api"]
    source      = "../templates/docker-compose-api.ctmpl"
    destination = "/etc/consul-template/templates/docker-compose.ctmpl"
  }

  # Web-specific template
  provisioner "file" {
    only        = ["digitalocean.web"]
    source      = "../templates/docker-compose-web.ctmpl"
    destination = "/etc/consul-template/templates/docker-compose.ctmpl"
  }

  # Landing-specific template
  provisioner "file" {
    only        = ["digitalocean.landing"]
    source      = "../templates/docker-compose-landing.ctmpl"
    destination = "/etc/consul-template/templates/docker-compose.ctmpl"
  }

  # Sites-specific template
  provisioner "file" {
    only        = ["digitalocean.sites"]
    source      = "../templates/docker-compose-sites.ctmpl"
    destination = "/etc/consul-template/templates/docker-compose.ctmpl"
  }

  # Neo4j-specific template
  provisioner "file" {
    only        = ["digitalocean.neo4j"]
    source      = "../templates/docker-compose-neo4j.ctmpl"
    destination = "/etc/consul-template/templates/docker-compose.ctmpl"
  }

  # Clean up for all
  provisioner "shell" {
    inline = [
      "echo 'Service-specific image built successfully'",
      "rm -rf /tmp/* /var/tmp/*"
    ]
  }
}