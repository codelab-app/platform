# Create a new Web Droplet in the nyc2 region
resource "digitalocean_droplet" "neo4j" {
  image  = "docker-20-04"
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

  # Run once only
  user_data = data.cloudinit_config.neo4j.rendered

  lifecycle {
    create_before_destroy = true
  }

  # Tags for easier management
  # tags = ["neo4j", "database"]

  # Optional: Enable the DigitalOcean agent
  droplet_agent = true
}

output "neo4j_uri" {
  # https://stackoverflow.com/questions/62357682/routing-issue-in-neo4j-4-0-with-multiple-databases
  value = "bolt://${digitalocean_droplet.neo4j.ipv4_address_private}:7687"
  # value = "bolt+s://${digitalocean_droplet.neo4j.ipv4_address_private}:7687"
}
