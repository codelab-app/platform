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

variable "digitalocean_api_token" {
  type        = string
  description = "DigitalOcean API Token"
  sensitive   = true
}

variable "do_region" {
  type        = string
  description = "DigitalOcean region for deployments"
  default     = "sgp1"
}

# This variable is passed by the CLI but not used in this build
# The encryption key is already baked into the services-base image
# We define it here only to avoid "undefined variable" errors
variable "consul_encrypt_key" {
  type        = string
  description = "Consul gossip encryption key (not used - already in base image)"
  sensitive   = true
}


# Use external data source to get the latest services base snapshot
# The script will use DIGITALOCEAN_API_TOKEN from environment
data "external" "latest_services_base" {
  program = ["bash", "-c", "DIGITALOCEAN_API_TOKEN='${var.digitalocean_api_token}' ${path.root}/../../scripts/get-latest-snapshot.sh codelab-services-base"]
}

locals {
  # Use the latest snapshot ID from external data source
  base_image_id = data.external.latest_services_base.result.id
}

# Define sources for each service
source "digitalocean" "api" {
  api_token    = var.digitalocean_api_token
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
  api_token    = var.digitalocean_api_token
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
  api_token    = var.digitalocean_api_token
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
  api_token    = var.digitalocean_api_token
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
  api_token    = var.digitalocean_api_token
  image        = local.base_image_id
  region       = var.do_region
  size         = "s-1vcpu-2gb-intel"  # Match Terraform deployment size (needs more RAM)
  ssh_username = "root"
  snapshot_name = "codelab-neo4j-base-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  snapshot_regions = [var.do_region]
  droplet_name = "packer-codelab-neo4j-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  tags         = ["packer", "neo4j", "service"]
}

source "digitalocean" "consul_server" {
  api_token    = var.digitalocean_api_token
  image        = local.base_image_id
  region       = var.do_region
  size         = "s-1vcpu-1gb-intel"  # Match Terraform deployment size
  ssh_username = "root"
  snapshot_name = "codelab-consul-server-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  snapshot_regions = [var.do_region]
  droplet_name = "packer-codelab-consul-server-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  tags         = ["packer", "consul", "server"]
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
    "source.digitalocean.neo4j",
    "source.digitalocean.consul_server"
  ]

  # API-specific template
  provisioner "file" {
    only        = ["digitalocean.api"]
    source      = "templates/docker-compose-api.ctmpl"
    destination = "/etc/consul-template/docker-compose.ctmpl"
  }

  # Web-specific template
  provisioner "file" {
    only        = ["digitalocean.web"]
    source      = "templates/docker-compose-web.ctmpl"
    destination = "/etc/consul-template/docker-compose.ctmpl"
  }

  # Landing-specific template
  provisioner "file" {
    only        = ["digitalocean.landing"]
    source      = "templates/docker-compose-landing.ctmpl"
    destination = "/etc/consul-template/docker-compose.ctmpl"
  }

  # Sites-specific template
  provisioner "file" {
    only        = ["digitalocean.sites"]
    source      = "templates/docker-compose-sites.ctmpl"
    destination = "/etc/consul-template/docker-compose.ctmpl"
  }

  # Neo4j-specific template
  provisioner "file" {
    only        = ["digitalocean.neo4j"]
    source      = "templates/docker-compose-neo4j.ctmpl"
    destination = "/etc/consul-template/docker-compose.ctmpl"
  }

  # CRITICAL: Selective Consul configuration based on node type
  #
  # Background: Consul loads ALL .hcl files from /etc/consul.d/ and merges them.
  # File names like 'consul-client.hcl' are NOT special - they're just descriptive.
  #
  # The Original Issue (discovered during Terraform Cloud integration):
  # 1. services-base image included consul-client.hcl for all services
  # 2. consul-client.hcl sets client_addr = "127.0.0.1" (security: API on localhost only)
  # 3. consul-server also inherited this file from the base image
  # 4. consul-server.hcl sets client_addr = "0.0.0.0" (needed for external API access)
  # 5. Both files were loaded and merged, causing conflict
  # 6. Result: Consul server API was restricted to localhost, breaking Terraform Cloud access
  #    Error: "dial tcp 152.42.251.206:8500: connect: connection refused"
  #
  # The Fix:
  # - Remove consul-client.hcl from base image (see services-base.pkr.hcl)
  # - Add it selectively here: only to client nodes, NOT to consul-server
  # - This ensures proper network access for each node type
  
  # Add consul-client.hcl to all CLIENT services (api, web, landing, sites, neo4j)
  # These nodes only need local API access for security
  provisioner "file" {
    except      = ["digitalocean.consul_server"]
    content     = templatefile("templates/consul-client.hcl.tpl", {
      digitalocean_api_token = var.digitalocean_api_token
      region                 = var.do_region
    })
    destination = "/etc/consul.d/consul-client.hcl"
  }

  # Consul SERVER configuration - needs external API access for:
  # - Terraform Cloud to write configuration via consul provider
  # - Consul UI access from browsers
  # - CLI access for administration
  provisioner "file" {
    only        = ["digitalocean.consul_server"]
    source      = "files/consul-server.hcl"
    destination = "/etc/consul.d/consul-server.hcl"
  }

  # Fix permissions for Consul configuration files
  provisioner "shell" {
    inline = [
      "chown consul:consul /etc/consul.d/*.hcl",
      "chmod 640 /etc/consul.d/*.hcl"
    ]
  }

  # Pre-pull Docker images for faster deployment
  # This caches the images in the snapshot, avoiding slow pulls on boot
  provisioner "shell" {
    only = ["digitalocean.landing"]
    inline = [
      "doctl registry login",
      "docker pull registry.digitalocean.com/codelabapp/landing:latest || true"
    ]
  }

  provisioner "shell" {
    only = ["digitalocean.api"]
    inline = [
      "doctl registry login",
      "docker pull registry.digitalocean.com/codelabapp/api:latest || true"
    ]
  }

  provisioner "shell" {
    only = ["digitalocean.web"]
    inline = [
      "doctl registry login",
      "docker pull registry.digitalocean.com/codelabapp/web:latest || true"
    ]
  }

  provisioner "shell" {
    only = ["digitalocean.sites"]
    inline = [
      "doctl registry login",
      "docker pull registry.digitalocean.com/codelabapp/sites:latest || true"
    ]
  }

  # Clean up and optimize snapshot size
  provisioner "shell" {
    inline = [
      "echo 'Service-specific image built successfully'",
      "",
      "# Clean up temporary files only (no apt operations needed)",
      "rm -rf /tmp/* /var/tmp/*",
      "",
      "# Trim filesystem to minimize snapshot size",
      "fstrim -av"
    ]
  }
}