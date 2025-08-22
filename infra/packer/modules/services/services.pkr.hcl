packer {
  required_plugins {
    digitalocean = {
      version = ">= 1.0.0"
      source  = "github.com/hashicorp/digitalocean"
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

variable "do_region" {
  type        = string
  description = "DigitalOcean region for deployments"
  default     = "sgp1"
}

# Use external data source to get the latest services base snapshot
# The script will use DO_API_TOKEN from environment
data "external" "latest_services_base" {
  program = ["bash", "-c", "DO_API_TOKEN='${var.do_token}' ${path.root}/../scripts/get-latest-snapshot.sh codelab-services-base"]
}

locals {
  # Use the latest snapshot ID from external data source
  base_image_id = data.external.latest_services_base.result.id
}

# Define sources for each service
source "digitalocean" "api" {
  api_token    = var.do_token
  image        = local.base_image_id
  region       = var.do_region
  size         = "s-1vcpu-1gb-intel"  # Match Terraform deployment size
  ssh_username = "root"
  snapshot_name = "codelab-api-base-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  snapshot_regions = [var.do_region]
  droplet_name = "packer-codelab-api-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  tags         = ["packer", "api", "service"]
}

source "digitalocean" "web" {
  api_token    = var.do_token
  image        = local.base_image_id
  region       = var.do_region
  size         = "s-1vcpu-1gb-intel"  # Match Terraform deployment size
  ssh_username = "root"
  snapshot_name = "codelab-web-base-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  snapshot_regions = [var.do_region]
  droplet_name = "packer-codelab-web-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  tags         = ["packer", "web", "service"]
}

source "digitalocean" "landing" {
  api_token    = var.do_token
  image        = local.base_image_id
  region       = var.do_region
  size         = "s-1vcpu-1gb-intel"  # Match Terraform deployment size
  ssh_username = "root"
  snapshot_name = "codelab-landing-base-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  snapshot_regions = [var.do_region]
  droplet_name = "packer-codelab-landing-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  tags         = ["packer", "landing", "service"]
}

source "digitalocean" "sites" {
  api_token    = var.do_token
  image        = local.base_image_id
  region       = var.do_region
  size         = "s-1vcpu-1gb-intel"  # Match Terraform deployment size
  ssh_username = "root"
  snapshot_name = "codelab-sites-base-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  snapshot_regions = [var.do_region]
  droplet_name = "packer-codelab-sites-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  tags         = ["packer", "sites", "service"]
}

source "digitalocean" "neo4j" {
  api_token    = var.do_token
  image        = local.base_image_id
  region       = var.do_region
  size         = "s-1vcpu-2gb-intel"  # Match Terraform deployment size (needs more RAM)
  ssh_username = "root"
  snapshot_name = "codelab-neo4j-base-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  snapshot_regions = [var.do_region]
  droplet_name = "packer-codelab-neo4j-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  tags         = ["packer", "neo4j", "service"]
}

# Build configuration for all services
build {
  # Build all service images in parallel
  # Note: Reduce parallelism if builds get stuck (DigitalOcean/Packer limitation)
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
    source      = "templates/docker-compose-api.ctmpl"
    destination = "/etc/consul-template/templates/docker-compose.ctmpl"
  }

  # Web-specific template
  provisioner "file" {
    only        = ["digitalocean.web"]
    source      = "templates/docker-compose-web.ctmpl"
    destination = "/etc/consul-template/templates/docker-compose.ctmpl"
  }

  # Landing-specific template
  provisioner "file" {
    only        = ["digitalocean.landing"]
    source      = "templates/docker-compose-landing.ctmpl"
    destination = "/etc/consul-template/templates/docker-compose.ctmpl"
  }

  # Sites-specific template
  provisioner "file" {
    only        = ["digitalocean.sites"]
    source      = "templates/docker-compose-sites.ctmpl"
    destination = "/etc/consul-template/templates/docker-compose.ctmpl"
  }

  # Neo4j-specific template
  provisioner "file" {
    only        = ["digitalocean.neo4j"]
    source      = "templates/docker-compose-neo4j.ctmpl"
    destination = "/etc/consul-template/templates/docker-compose.ctmpl"
  }

  # Clean up and optimize snapshot size
  provisioner "shell" {
    inline = [
      "echo 'Service-specific image built successfully'",
      "",
      "# Wait for any apt processes to finish gracefully",
      "while fuser /var/lib/dpkg/lock-frontend >/dev/null 2>&1 || fuser /var/lib/apt/lists/lock >/dev/null 2>&1; do",
      "  echo 'Waiting for apt lock to be released...'",
      "  sleep 2",
      "done",
      "",
      "# Clean up temporary files",
      "rm -rf /tmp/* /var/tmp/*",
      "apt-get clean",
      "rm -rf /var/lib/apt/lists/*",
      "",
      "# CRITICAL: Trim filesystem to minimize snapshot size",
      "# Without this, snapshots are 60GB. With this, only ~2-3GB is billed",
      "fstrim -av"
    ]
  }
}