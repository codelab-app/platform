/**
 * Application Base Image for Codelab Platform
 *
 * This Packer template creates a DigitalOcean snapshot optimized for
 * stateless application services (API, Web, Landing, Sites).
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

source "digitalocean" "app_base" {
  api_token     = var.do_token
  droplet_name  = "packer-codelab-app-base-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  image         = "ubuntu-22-04-x64"
  region        = var.region
  size          = "s-2vcpu-4gb"  # Higher CPU for faster builds (3-4 mins)
  ssh_username  = "root"
  snapshot_name = "codelab-app-base-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"

  snapshot_regions = [var.region]
}

build {
  sources = ["source.digitalocean.app_base"]

  # Wait for system to be ready (more robust)
  provisioner "shell" {
    inline = [
      "# Wait for cloud-init to complete",
      "cloud-init status --wait || true",
      "# Disable unattended-upgrades",
      "systemctl stop unattended-upgrades || true",
      "systemctl disable unattended-upgrades || true",
      "# Wait for any apt/dpkg processes to finish",
      "while fuser /var/lib/dpkg/lock-frontend >/dev/null 2>&1; do",
      "  echo 'Waiting for dpkg lock...'",
      "  sleep 2",
      "done",
      "# Ensure dpkg is in a clean state",
      "dpkg --configure -a || true"
    ]
  }

  # Install only essential packages
  provisioner "shell" {
    inline = [
      "# Update package list",
      "apt-get update",
      "# Install only essentials without upgrades",
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
    script = "../scripts/install-docker.sh"
  }

  # Install Consul and Consul-Template from HashiCorp APT repository
  provisioner "shell" {
    script = "../scripts/install-consul.sh"
  }

  # Install DigitalOcean CLI for registry operations
  provisioner "shell" {
    environment_vars = [
      "DOCTL_VERSION=${var.doctl_version}"
    ]
    script = "../scripts/install-doctl.sh"
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
    source      = "../files/daemon.json"
    destination = "/etc/docker/daemon.json"
  }

  provisioner "file" {
    source      = "../files/consul-final.hcl"
    destination = "/etc/consul.d/consul.hcl"
  }

  provisioner "file" {
    source      = "../files/consul-template.hcl"
    destination = "/etc/consul-template/consul-template.hcl"
  }

  provisioner "file" {
    source      = "../files/consul.service"
    destination = "/etc/systemd/system/consul.service"
  }

  provisioner "file" {
    source      = "../files/consul-template.service"
    destination = "/etc/systemd/system/consul-template.service"
  }

  provisioner "file" {
    source      = "../files/docker-login.service"
    destination = "/etc/systemd/system/docker-login.service"
  }

  provisioner "file" {
    source      = "../templates/docker-compose.ctmpl"
    destination = "/etc/consul-template/docker-compose.ctmpl"
  }

  # Setup permissions and enable services
  provisioner "shell" {
    inline = [
      "",
      "# Set permissions",
      "chown -R consul:consul /etc/consul.d /opt/consul /var/log/consul",
      "",
      "# Enable services",
      "systemctl daemon-reload",
      "systemctl enable docker",
      "systemctl enable consul",
      "systemctl enable docker-login",
      "systemctl enable consul-template",
      "",
      "# Create static Consul encryption key",
      "echo 'kLQhfLQVzl8DSFZW7alQrPX6kZL0FovN8EdSYy5hLXE=' > /etc/consul.d/encrypt.key",
      "chmod 600 /etc/consul.d/encrypt.key",
      "chown consul:consul /etc/consul.d/encrypt.key",
      "",
      "# Clean up",
      "apt-get clean",
      "rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*",
      "truncate -s 0 /var/log/*log"
    ]
  }

  # Final optimizations and cleanup
  provisioner "shell" {
    inline = [
      "# Kernel tuning for containers",
      "echo 'vm.max_map_count=262144' >> /etc/sysctl.conf",
      "echo 'net.core.somaxconn=1024' >> /etc/sysctl.conf",
      "",
      "# Remove package manager cache to reduce image size",
      "apt-get clean",
      "rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*",
      "",
      "# Remove unnecessary files",
      "rm -rf /usr/share/doc/* /usr/share/man/* /usr/share/info/*",
      "find /var/cache -type f -delete",
      "find /var/log -type f -delete"
    ]
  }
}