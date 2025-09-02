/**
 * Services Base Image for Codelab Platform
 *
 * This Packer template creates a DigitalOcean snapshot optimized for
 * stateless services (API, Web, Landing, Sites).
 *
 * Pre-installed components:
 * - Docker Engine & Docker Compose for container orchestration
 * - Consul & Consul-Template for configuration management
 * - DigitalOcean CLI for registry authentication
 * - Basic monitoring and debugging tools
 *
 * This image is optimized for:
 * - Fast boot times
 * - Minimal resource usage
 * - Stateless application workloads
 * - Horizontal scaling
 */

# Plugin requirements are defined in common.pkr.hcl

variable "digitalocean_api_token" {
  type        = string
  description = "DigitalOcean API Token"
  sensitive   = true
}

locals {
  # These don't need to be configurable
  region                = "sgp1"
  docker_compose_version = "2.24.0"
  doctl_version         = "1.104.0"
}

variable "consul_encrypt_key" {
  type        = string
  description = "Consul gossip encryption key (generate with: consul keygen) - Set via CONSUL_ENCRYPT_KEY env var"
  sensitive   = true
  # No default - will fail if not provided
}

source "digitalocean" "base" {
  api_token     = var.digitalocean_api_token
  droplet_name  = "packer-codelab-base-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  image         = "ubuntu-22-04-x64"
  region        = local.region
  size          = local.droplet_sizes.small
  ssh_username  = "root"
  snapshot_name = "codelab-base-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  snapshot_regions = [local.region]
}

build {
  sources = ["source.digitalocean.base"]

  # Use Ansible for all provisioning
  provisioner "ansible" {
    playbook_file = "base/playbook.yml"
    extra_arguments = [
      "--extra-vars",
      "docker_compose_version=${local.docker_compose_version}",
      "--extra-vars",
      "doctl_version=${local.doctl_version}",
      "--extra-vars",
      "consul_encrypt_key=${var.consul_encrypt_key}",
      "--extra-vars",
      "digitalocean_api_token=${var.digitalocean_api_token}",
      "--extra-vars",
      "region=${local.region}"
    ]
  }
}