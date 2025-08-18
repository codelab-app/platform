packer {
  required_plugins {
    digitalocean = {
      version = ">= 1.0.0"
      source  = "github.com/hashicorp/digitalocean"
    }
  }
}

variable "do_token" {
  type        = string
  description = "DigitalOcean API Token"
  sensitive   = true
}

# Find the base image to build from
data "digitalocean_image" "app_base" {
  name_regex  = "^codelab-app-base-.*"
  region      = "sfo3"
  most_recent = true
}

source "digitalocean" "neo4j-base" {
  api_token    = var.do_token
  image        = data.digitalocean_image.app_base.id
  region       = "sfo3"
  size         = "s-2vcpu-4gb"
  ssh_username = "root"
  snapshot_name = "codelab-neo4j-base-{{timestamp}}"
  snapshot_regions = ["sfo3"]
  droplet_name = "packer-neo4j-build-{{timestamp}}"
  tags         = ["packer", "neo4j", "base"]
}

build {
  sources = ["source.digitalocean.neo4j-base"]

  # Replace the generic docker-compose template with neo4j-specific one
  provisioner "file" {
    source      = "../templates/docker-compose-neo4j.ctmpl"
    destination = "/etc/consul-template/templates/docker-compose.ctmpl"
  }

  # Database-specific optimizations
  provisioner "shell" {
    inline = [
      "# Create Neo4j directories",
      "mkdir -p /data /backup /var/lib/neo4j",
      "",
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
      "  local device=\\$1",
      "  local mount_point=\\$2",
      "  ",
      "  if [ ! -d \"\\$mount_point\" ]; then",
      "    mkdir -p \"\\$mount_point\"",
      "  fi",
      "  ",
      "  if ! mountpoint -q \"\\$mount_point\"; then",
      "    mount \"\\$device\" \"\\$mount_point\"",
      "    echo \"Mounted \\$device to \\$mount_point\"",
      "  else",
      "    echo \"\\$mount_point is already mounted\"",
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
      "echo 'Neo4j-specific image built successfully'",
      "rm -rf /tmp/* /var/tmp/*"
    ]
  }
}