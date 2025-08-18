/**
 * Neo4j Database Base Image for Codelab Platform
 * 
 * This Packer template creates a DigitalOcean snapshot optimized for
 * Neo4j and other database services that require persistent storage.
 * 
 * Pre-installed components:
 * - Everything from app-base image
 * - Grafana Alloy for metrics collection
 * - Volume management utilities
 * - Database backup tools
 * - Enhanced monitoring stack
 * 
 * This image is optimized for:
 * - Database workloads
 * - Persistent volume management
 * - Metrics collection
 * - Backup operations
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

variable "alloy_version" {
  type        = string
  description = "Grafana Alloy version to install"
  default     = "1.4.4"
}

source "digitalocean" "neo4j_base" {
  api_token     = var.do_token
  droplet_name  = "packer-codelab-neo4j-base-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  image         = "ubuntu-22-04-x64"
  region        = var.region
  size          = "s-1vcpu-2gb"  # Larger size for database builds
  ssh_username  = "root"
  snapshot_name = "codelab-neo4j-base-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  
  snapshot_regions = [var.region]
}

build {
  sources = ["source.digitalocean.neo4j_base"]

  # System updates and base packages (including database tools)
  provisioner "shell" {
    inline = [
      "apt-get update",
      "DEBIAN_FRONTEND=noninteractive apt-get upgrade -y",
      "DEBIAN_FRONTEND=noninteractive apt-get install -y \\",
      "  curl wget gnupg lsb-release software-properties-common \\",
      "  unzip jq htop net-tools dnsutils vim iotop sysstat \\",
      "  ca-certificates apt-transport-https \\",
      "  xfsprogs e2fsprogs # For volume management"
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

  # Install DigitalOcean CLI for registry and volume operations
  provisioner "shell" {
    environment_vars = [
      "DOCTL_VERSION=${var.doctl_version}"
    ]
    script = "../scripts/install-doctl.sh"
  }

  # Install Grafana Alloy for metrics collection
  provisioner "shell" {
    environment_vars = [
      "ALLOY_VERSION=${var.alloy_version}"
    ]
    inline = [
      "echo 'Installing Grafana Alloy ${ALLOY_VERSION}...'",
      "wget -q -O - https://apt.grafana.com/gpg.key | gpg --dearmor -o /usr/share/keyrings/grafana.gpg",
      "echo 'deb [signed-by=/usr/share/keyrings/grafana.gpg] https://apt.grafana.com stable main' | tee /etc/apt/sources.list.d/grafana.list",
      "apt-get update",
      "apt-get install -y alloy=${ALLOY_VERSION}-1 || apt-get install -y alloy",
      "systemctl enable alloy"
    ]
  }

  # Copy startup script and systemd services
  provisioner "file" {
    source      = "../scripts/consul-startup-neo4j.sh"
    destination = "/tmp/consul-startup-neo4j.sh"
  }

  provisioner "file" {
    source      = "../files/consul-startup.service"
    destination = "/tmp/consul-startup.service"
  }

  # Copy systemd service files
  provisioner "file" {
    source      = "../files/consul.service"
    destination = "/etc/systemd/system/consul.service"
  }

  provisioner "file" {
    source      = "../files/consul-template.service"
    destination = "/etc/systemd/system/consul-template.service"
  }

  # Setup directory structure for database and monitoring
  provisioner "shell" {
    inline = [
      "# Install startup script",
      "mv /tmp/consul-startup-neo4j.sh /usr/local/bin/consul-startup.sh",
      "chmod +x /usr/local/bin/consul-startup.sh",
      "",
      "# Install startup systemd service",
      "mv /tmp/consul-startup.service /etc/systemd/system/",
      "",
      "# Create directories",
      "mkdir -p /etc/consul.d /opt/consul /etc/consul-template",
      "mkdir -p /root/docker /var/log/consul",
      "mkdir -p /data /backup /var/lib/neo4j /var/lib/grafana-alloy",
      "mkdir -p /etc/alloy",
      "",
      "# Set permissions",
      "chown -R consul:consul /etc/consul.d /opt/consul /var/log/consul",
      "chown -R alloy:alloy /var/lib/grafana-alloy /etc/alloy",
      "",
      "# Enable services",
      "systemctl daemon-reload",
      "systemctl enable docker",
      "systemctl enable consul-startup.service",
      "",
      "# Clean up",
      "apt-get clean",
      "rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*",
      "history -c",
      "truncate -s 0 /var/log/*log"
    ]
  }
  
  # Database-specific optimizations
  provisioner "shell" {
    inline = [
      "# Tune for database workloads",
      "echo 'vm.max_map_count=262144' >> /etc/sysctl.conf",
      "echo 'vm.swappiness=1' >> /etc/sysctl.conf",
      "echo 'net.core.somaxconn=65535' >> /etc/sysctl.conf",
      "",
      "# Setup volume mount helper script",
      "cat > /usr/local/bin/mount-volumes <<'EOF'",
      "#!/bin/bash",
      "# Helper script to mount DigitalOcean volumes",
      "set -e",
      "",
      "mount_volume() {",
      "  local device=$1",
      "  local mount_point=$2",
      "  ",
      "  if [ ! -d \"$mount_point\" ]; then",
      "    mkdir -p \"$mount_point\"",
      "  fi",
      "  ",
      "  if ! mountpoint -q \"$mount_point\"; then",
      "    mount \"$device\" \"$mount_point\"",
      "    echo \"Mounted $device to $mount_point\"",
      "  else",
      "    echo \"$mount_point is already mounted\"",
      "  fi",
      "}",
      "",
      "# Mount Neo4j data volume if attached",
      "if [ -e /dev/disk/by-id/scsi-0DO_Volume_neo4j-data ]; then",
      "  mount_volume /dev/disk/by-id/scsi-0DO_Volume_neo4j-data /data/neo4j",
      "fi",
      "",
      "# Mount backup volume if attached",
      "if [ -e /dev/disk/by-id/scsi-0DO_Volume_neo4j-backup ]; then",
      "  mount_volume /dev/disk/by-id/scsi-0DO_Volume_neo4j-backup /backup",
      "fi",
      "EOF",
      "chmod +x /usr/local/bin/mount-volumes",
      "",
      "# Database backup script",
      "cat > /usr/local/bin/backup-neo4j <<'EOF'",
      "#!/bin/bash",
      "# Neo4j backup script",
      "BACKUP_DIR=/backup/neo4j/$(date +%Y%m%d-%H%M%S)",
      "mkdir -p $BACKUP_DIR",
      "",
      "# Stop writes during backup",
      "docker exec neo4j cypher-shell -u neo4j -p $NEO4J_PASSWORD 'CALL dbms.cluster.setDatabaseMode(\"system\", \"READ_ONLY\")'",
      "",
      "# Perform backup",
      "docker exec neo4j neo4j-admin database backup --to-path=$BACKUP_DIR neo4j",
      "",
      "# Resume writes",
      "docker exec neo4j cypher-shell -u neo4j -p $NEO4J_PASSWORD 'CALL dbms.cluster.setDatabaseMode(\"system\", \"READ_WRITE\")'",
      "",
      "# Keep only last 7 days of backups",
      "find /backup/neo4j -type d -mtime +7 -exec rm -rf {} +",
      "EOF",
      "chmod +x /usr/local/bin/backup-neo4j",
      "",
      "# Add backup to cron (daily at 2am)",
      "echo '0 2 * * * root /usr/local/bin/backup-neo4j' >> /etc/crontab"
    ]
  }
}