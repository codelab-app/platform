# Plugin requirements are defined in base.pkr.hcl which is in the same directory
# Variables are defined in base.pkr.hcl which is in the same directory
# No need to redefine them here

variable "do_region" {
  type        = string
  description = "DigitalOcean region for deployments"
  default     = "sgp1"
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