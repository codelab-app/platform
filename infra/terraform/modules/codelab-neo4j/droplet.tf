# Find the latest Packer-built neo4j base image
data "digitalocean_image" "codelab_neo4j_base" {
  name_regex  = "^codelab-neo4j-base-.*"
  region      = var.digitalocean_region
  most_recent = true
}

# Create a new Neo4j Droplet
resource "digitalocean_droplet" "neo4j" {
  image  = data.digitalocean_image.codelab_neo4j_base.id
  name   = "neo4j"
  region = var.digitalocean_region
  size   = "s-1vcpu-2gb-intel"
  # Optional configurations
  backups    = true # Enable backups for additional safety
  monitoring = true # Enable monitoring for the Droplet
  ipv6       = true # Enable IPv6 (make sure this is supported in your chosen region)
  vpc_uuid   = var.codelab_app_vpc_id

  # SSH keys
  ssh_keys = ["31:0e:90:12:06:a2:9f:8b:07:0e:a8:49:cc:d8:1f:71"]

  # No user_data - everything is baked into the image

  lifecycle {
    create_before_destroy = true
    ignore_changes = []
  }

  # Tags for easier management
  # tags = ["neo4j", "database"]

  # Optional: Enable the DigitalOcean agent
  droplet_agent = true
}

output "neo4j_uri" {
  # Use droplet name instead of IP address to avoid hardcoding IPs.
  # DigitalOcean provides automatic DNS resolution for droplet names within the same VPC,
  # allowing infrastructure changes without updating connection strings.
  # The old Neo4j 4.0 routing issue has been resolved in Neo4j 5.x.
  value = "bolt://${digitalocean_droplet.neo4j.name}:7687"
}
