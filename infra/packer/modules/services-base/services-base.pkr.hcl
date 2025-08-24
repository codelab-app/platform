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

packer {
  required_plugins {
    digitalocean = {
      version = ">= 1.1.1"
      source  = "github.com/digitalocean/digitalocean"
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

variable "consul_encrypt_key" {
  type        = string
  description = "Consul gossip encryption key (generate with: consul keygen) - Set via CONSUL_ENCRYPT_KEY env var"
  sensitive   = true
  # No default - will fail if not provided
}

source "digitalocean" "services_base" {
  api_token     = var.do_token
  droplet_name  = "packer-codelab-services-base-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  image         = "ubuntu-22-04-x64"
  region        = var.region
  size          = "s-1vcpu-1gb"  # Match Terraform Consul deployment size
  ssh_username  = "root"
  snapshot_name = "codelab-services-base-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  snapshot_regions = [var.region]
}

build {
  sources = ["source.digitalocean.services_base"]

  # System initialization and essential packages
  provisioner "shell" {
    inline = [
      "# Wait for cloud-init to complete",
      "cloud-init status --wait || true",
      "",
      "# Wait for any apt/dpkg processes to finish",
      "while fuser /var/lib/dpkg/lock-frontend >/dev/null 2>&1 || fuser /var/lib/apt/lists/lock >/dev/null 2>&1; do",
      "  echo 'Waiting for apt/dpkg lock...'",
      "  sleep 2",
      "done",
      "",
      "# Ensure dpkg is in a clean state",
      "dpkg --configure -a || true",
      "",
      "# Update package list and install essentials in one step",
      "apt-get update",
      "DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends --no-upgrade \\",
      "  curl wget gnupg lsb-release software-properties-common \\",
      "  ca-certificates apt-transport-https unzip"
    ]
  }

  # Install Docker and Docker Compose
  provisioner "shell" {
    environment_vars = [
      "DOCKER_COMPOSE_VERSION=${var.docker_compose_version}"
    ]
    script = "scripts/install-docker.sh"
  }

  # Install Consul and Consul-Template from HashiCorp APT repository
  provisioner "shell" {
    script = "scripts/install-consul.sh"
  }

  # Install DigitalOcean CLI for registry operations
  provisioner "shell" {
    environment_vars = [
      "DOCTL_VERSION=${var.doctl_version}"
    ]
    script = "scripts/install-doctl.sh"
  }

  # Setup directory structure FIRST before copying files
  provisioner "shell" {
    inline = [
      "# Create all required directories",
      "mkdir -p /etc/consul.d /opt/consul /var/log/consul",
      "mkdir -p /etc/consul-template",
      "mkdir -p /root/docker",
      "mkdir -p /etc/systemd/system"
    ]
  }

  # Copy all configuration files at once (grouped for efficiency)
  provisioner "file" {
    source      = "files/daemon.json"
    destination = "/etc/docker/daemon.json"
  }

  provisioner "file" {
    source      = "../consul-base/consul-base.hcl"
    destination = "/etc/consul.d/consul-base.hcl"
  }

  provisioner "shell" {
    environment_vars = [
      "CONSUL_ENCRYPT_KEY=${var.consul_encrypt_key}"
    ]
    inline = [
      "echo \"encrypt = \\\"$CONSUL_ENCRYPT_KEY\\\"\" > /etc/consul.d/encryption.hcl"
    ]
  }

  provisioner "file" {
    source      = "files/consul-client.hcl"
    destination = "/etc/consul.d/consul-client.hcl"
  }

  provisioner "file" {
    source      = "files/consul-template.hcl"
    destination = "/etc/consul-template/consul-template.hcl"
  }

  provisioner "file" {
    source      = "files/consul.service"
    destination = "/etc/systemd/system/consul.service"
  }

  provisioner "file" {
    source      = "files/consul-template.service"
    destination = "/etc/systemd/system/consul-template.service"
  }

  provisioner "file" {
    source      = "files/docker-login.service"
    destination = "/etc/systemd/system/docker-login.service"
  }

  provisioner "file" {
    source      = "files/docker-compose.ctmpl"
    destination = "/etc/consul-template/docker-compose.ctmpl"
  }

  # Setup permissions, enable services, and optimize
  provisioner "shell" {
    inline = [
      "# Set Consul permissions",
      "chown -R consul:consul /etc/consul.d /opt/consul /var/log/consul",
      "chmod 640 /etc/consul.d/encryption.hcl",
      "",
      "# Enable services",
      "systemctl daemon-reload",
      "systemctl enable docker consul docker-login consul-template",
      "",
      "# Kernel tuning for containers",
      "echo 'vm.max_map_count=262144' >> /etc/sysctl.conf",
      "echo 'net.core.somaxconn=1024' >> /etc/sysctl.conf",
      "",
      "# Permanently disable automatic apt updates",
      "systemctl mask apt-daily.service apt-daily-upgrade.service unattended-upgrades.service",
      "",
      "# Clean up to reduce image size",
      "apt-get clean",
      "rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*",
      "rm -rf /usr/share/doc/* /usr/share/man/* /usr/share/info/*",
      "find /var/cache -type f -delete",
      "find /var/log -type f -delete",
      "",
      "# Trim filesystem to minimize snapshot size (25GB -> 2-3GB)",
      "fstrim -av"
    ]
  }
}