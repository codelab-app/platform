# Consul Backup Configuration
# Automated daily backups to DigitalOcean Spaces

resource "digitalocean_spaces_bucket" "consul_backups" {
  name   = "codelab-consul-backups"
  region = var.digitalocean_region
  acl    = "private"

  lifecycle_rule {
    enabled = true
    
    expiration {
      days = 30  # Keep backups for 30 days
    }
  }
}

# Backup script
locals {
  consul_backup_script = <<-EOF
#!/bin/bash
set -e

# Backup Consul KV and snapshot
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_DIR="/tmp/consul-backup-$${TIMESTAMP}"
mkdir -p $${BACKUP_DIR}

# Create Consul snapshot
consul snapshot save "$${BACKUP_DIR}/consul-snapshot-$${TIMESTAMP}.snap"

# Export KV store
consul kv export > "$${BACKUP_DIR}/consul-kv-$${TIMESTAMP}.json"

# Upload to DigitalOcean Spaces
doctl spaces upload \
  "$${BACKUP_DIR}/consul-snapshot-$${TIMESTAMP}.snap" \
  "consul-backups/snapshots/" \
  --space ${digitalocean_spaces_bucket.consul_backups.name} \
  --region ${var.digitalocean_region}

doctl spaces upload \
  "$${BACKUP_DIR}/consul-kv-$${TIMESTAMP}.json" \
  "consul-backups/kv/" \
  --space ${digitalocean_spaces_bucket.consul_backups.name} \
  --region ${var.digitalocean_region}

# Cleanup
rm -rf $${BACKUP_DIR}

echo "Consul backup completed: $${TIMESTAMP}"
EOF

  consul_restore_script = <<-EOF
#!/bin/bash
set -e

# Restore Consul from backup
if [ -z "$1" ]; then
  echo "Usage: $0 <timestamp>"
  echo "Example: $0 20240315-120000"
  exit 1
fi

TIMESTAMP=$1
RESTORE_DIR="/tmp/consul-restore-$${TIMESTAMP}"
mkdir -p $${RESTORE_DIR}

# Download from DigitalOcean Spaces
doctl spaces download \
  "consul-backups/snapshots/consul-snapshot-$${TIMESTAMP}.snap" \
  "$${RESTORE_DIR}/" \
  --space ${digitalocean_spaces_bucket.consul_backups.name} \
  --region ${var.digitalocean_region}

# Restore snapshot
consul snapshot restore "$${RESTORE_DIR}/consul-snapshot-$${TIMESTAMP}.snap"

echo "Consul restored from: $${TIMESTAMP}"
echo "Services will reconnect automatically"
EOF
}

# Add backup scripts to Consul server
# TODO: Enable after configuring SSH key variable
# resource "null_resource" "consul_backup_setup" {
#   depends_on = [digitalocean_droplet.consul_server]
# 
#   connection {
#     type        = "ssh"
#     host        = digitalocean_droplet.consul_server.ipv4_address
#     user        = "root"
#     private_key = file("~/.ssh/id_rsa")
#   }

#   provisioner "file" {
#     content     = local.consul_backup_script
#     destination = "/usr/local/bin/consul-backup.sh"
#   }
# 
#   provisioner "file" {
#     content     = local.consul_restore_script
#     destination = "/usr/local/bin/consul-restore.sh"
#   }
# 
#   provisioner "remote-exec" {
#     inline = [
#       "chmod +x /usr/local/bin/consul-backup.sh",
#       "chmod +x /usr/local/bin/consul-restore.sh",
#       
#       # Setup daily backup cron
#       "echo '0 2 * * * /usr/local/bin/consul-backup.sh >> /var/log/consul-backup.log 2>&1' | crontab -",
#       
#       # Install doctl for Spaces access
#       "snap install doctl",
#       "doctl auth init -t ${var.digitalocean_access_token}"
#     ]
#   }
# }

output "consul_backup_bucket" {
  value = digitalocean_spaces_bucket.consul_backups.name
  description = "DigitalOcean Spaces bucket for Consul backups"
}