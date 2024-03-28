# Create a new Web Droplet in the nyc2 region
resource "digitalocean_droplet" "neo4j" {
  image  = "docker-20-04"
  name   = "neo4j"
  region = "sfo2"
  size   = "s-1vcpu-1gb"
  # Optional configurations
  backups    = true # Enable backups for additional safety
  monitoring = true # Enable monitoring for the Droplet
  ipv6       = true # Enable IPv6 (make sure this is supported in your chosen region)
  vpc_uuid   = digitalocean_vpc.codelab_app.id

  # SSH keys
  ssh_keys = ["31:0e:90:12:06:a2:9f:8b:07:0e:a8:49:cc:d8:1f:71"]

  # Run once only
  user_data = templatefile("${path.module}/neo4j-droplet.yaml", {
    digitalocean_access_token = var.digitalocean_access_token,
  })

  lifecycle {
    ignore_changes = [user_data]
  }

  # Tags for easier management
  # tags = ["neo4j", "database"]

  # Optional: Enable the DigitalOcean agent
  droplet_agent = true
}

# Outputs to retrieve the Droplet's IP addresses
output "neo4j_ipv4_address" {
  value = digitalocean_droplet.neo4j.ipv4_address
}

output "neo4j_ipv6_address" {
  value = digitalocean_droplet.neo4j.ipv6_address
}
