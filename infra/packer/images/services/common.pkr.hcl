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
# The encryption key is already baked into the base image
# We define it here only to avoid "undefined variable" errors
variable "consul_encrypt_key" {
  type        = string
  description = "Consul gossip encryption key (not used - already in base image)"
  sensitive   = true
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