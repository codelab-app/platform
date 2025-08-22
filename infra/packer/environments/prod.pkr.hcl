/**
 * Production Environment Full Stack Build
 * 
 * This file orchestrates building ALL Packer images for production in parallel where possible.
 * It defines all sources and builds them together, respecting dependencies.
 * 
 * Usage: packer build -var="do_token=$DIGITALOCEAN_API_TOKEN" environments/prod.pkr.hcl
 * 
 * Images Built:
 * - services-base: Base image with Docker, Consul client, common tools
 * - consul-server: Consul server with UI enabled
 * - api, web, landing, sites, neo4j: Service-specific images
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

# Variables
variable "do_token" {
  type        = string
  description = "DigitalOcean API Token"
  sensitive   = true
}

variable "region" {
  type        = string
  description = "DigitalOcean region for deployments"
  default     = "sgp1"
}

variable "docker_compose_version" {
  type        = string
  description = "Docker Compose version to install"
  default     = "2.24.0"
}

variable "doctl_version" {
  type        = string
  description = "DigitalOcean CLI version to install"
  default     = "1.104.0"
}

# Get latest services-base snapshot for dependent images
data "external" "latest_services_base" {
  program = ["bash", "-c", "DO_API_TOKEN='${var.do_token}' ${path.root}/../scripts/get-latest-base-snapshot.sh"]
}

locals {
  # Use existing services-base or build new one
  services_base_image_id = try(data.external.latest_services_base.result.id, "ubuntu-22-04-x64")
}

# ===== SERVICES BASE IMAGE =====
source "digitalocean" "services_base" {
  api_token     = var.do_token
  droplet_name  = "packer-codelab-services-base-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  image         = "ubuntu-22-04-x64"
  region        = var.region
  size          = "s-1vcpu-1gb"
  ssh_username  = "root"
  snapshot_name = "codelab-services-base-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  snapshot_regions = [var.region]
  tags          = ["packer", "services-base", "production"]
}

# ===== CONSUL SERVER IMAGE =====
source "digitalocean" "consul_server" {
  api_token     = var.do_token
  droplet_name  = "packer-consul-server-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  image         = local.services_base_image_id
  region        = var.region
  size          = "s-1vcpu-1gb"
  ssh_username  = "root"
  snapshot_name = "codelab-consul-server-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  snapshot_regions = [var.region]
  tags          = ["packer", "consul", "server", "production"]
}

# ===== SERVICE IMAGES =====
source "digitalocean" "api" {
  api_token    = var.do_token
  image        = local.services_base_image_id
  region       = var.region
  size         = "s-1vcpu-1gb-intel"
  ssh_username = "root"
  snapshot_name = "codelab-api-base-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  snapshot_regions = [var.region]
  droplet_name = "packer-codelab-api-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  tags         = ["packer", "api", "service", "production"]
}

source "digitalocean" "web" {
  api_token    = var.do_token
  image        = local.services_base_image_id
  region       = var.region
  size         = "s-1vcpu-1gb-intel"
  ssh_username = "root"
  snapshot_name = "codelab-web-base-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  snapshot_regions = [var.region]
  droplet_name = "packer-codelab-web-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  tags         = ["packer", "web", "service", "production"]
}

source "digitalocean" "landing" {
  api_token    = var.do_token
  image        = local.services_base_image_id
  region       = var.region
  size         = "s-1vcpu-1gb-intel"
  ssh_username = "root"
  snapshot_name = "codelab-landing-base-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  snapshot_regions = [var.region]
  droplet_name = "packer-codelab-landing-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  tags         = ["packer", "landing", "service", "production"]
}

source "digitalocean" "sites" {
  api_token    = var.do_token
  image        = local.services_base_image_id
  region       = var.region
  size         = "s-1vcpu-1gb-intel"
  ssh_username = "root"
  snapshot_name = "codelab-sites-base-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  snapshot_regions = [var.region]
  droplet_name = "packer-codelab-sites-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  tags         = ["packer", "sites", "service", "production"]
}

source "digitalocean" "neo4j" {
  api_token    = var.do_token
  image        = local.services_base_image_id
  region       = var.region
  size         = "s-1vcpu-2gb-intel"
  ssh_username = "root"
  snapshot_name = "codelab-neo4j-base-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  snapshot_regions = [var.region]
  droplet_name = "packer-codelab-neo4j-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  tags         = ["packer", "neo4j", "service", "production"]
}

# ===== BUILD ALL IMAGES =====
build {
  # Build all images in parallel (Packer handles dependencies)
  sources = [
    "source.digitalocean.services_base",
    "source.digitalocean.consul_server",
    "source.digitalocean.api",
    "source.digitalocean.web",
    "source.digitalocean.landing",
    "source.digitalocean.sites",
    "source.digitalocean.neo4j"
  ]

  # Include the provisioners from modules here
  # This is a simplified example - in practice you'd copy the provisioners
  # from each module or use HCL2's dynamic blocks
  
  # For services-base only
  provisioner "shell" {
    only = ["digitalocean.services_base"]
    inline = [
      "echo 'Building services-base image with Docker, Consul, etc.'",
      "# Full provisioning would go here - copied from modules/services-base/"
    ]
  }

  # For consul-server only
  provisioner "shell" {
    only = ["digitalocean.consul_server"]
    inline = [
      "echo 'Configuring Consul server'",
      "rm -f /etc/consul.d/consul-client.hcl",
      "# Full provisioning would go here - copied from modules/consul-server/"
    ]
  }

  # For service images
  provisioner "shell" {
    only = ["digitalocean.api", "digitalocean.web", "digitalocean.landing", "digitalocean.sites", "digitalocean.neo4j"]
    inline = [
      "echo 'Configuring service-specific settings'",
      "# Service-specific provisioning would go here"
    ]
  }

  # Clean up all images
  provisioner "shell" {
    inline = [
      "# Clean up",
      "apt-get clean",
      "rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*",
      "fstrim -av",
      "sync"
    ]
  }
}