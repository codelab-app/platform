/**
 * Common configuration shared across all Packer templates
 * This file is automatically loaded by Packer when in the same directory
 */

packer {
  required_plugins {
    digitalocean = {
      version = ">= 1.1.1"
      source  = "github.com/digitalocean/digitalocean"
    }
    ansible = {
      version = ">= 1.1.0"
      source  = "github.com/hashicorp/ansible"
    }
  }
}

variable "do_region" {
  type        = string
  description = "DigitalOcean region for deployments"
  default     = "sgp1"
}

locals {
  # Droplet size presets - shared across all images
  droplet_sizes = {
    small  = "s-1vcpu-1gb"      # Most services (API, Web, Landing, Sites, Consul)
    medium = "s-1vcpu-2gb"      # Neo4j, Grafana (need more RAM)
    large  = "s-2vcpu-4gb"      # Future use for heavy workloads
  }
}

# Use external data source to get the latest base snapshot
# The script will use DIGITALOCEAN_API_TOKEN from environment
data "external" "latest_base" {
  program = ["bash", "-c", "echo \"{\\\"id\\\":\\\"$(doctl compute snapshot list --format ID,Name,CreatedAt --no-header | grep codelab-base | sort -k3 -r | head -1 | awk '{print $1}')\\\"}\""]
}

locals {
  # Use the latest snapshot ID from external data source
  base_image_id = data.external.latest_base.result.id
}