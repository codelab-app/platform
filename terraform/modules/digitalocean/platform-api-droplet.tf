resource "digitalocean_droplet" "platform-api" {
  image  = "docker-20-04"
  name   = "platform-api"
  region = "sfo2"
  size   = "s-1vcpu-1gb"

  backups    = true
  monitoring = true
  ipv6       = true

  vpc_uuid = digitalocean_vpc.codelab_app.id

  ssh_keys = ["31:0e:90:12:06:a2:9f:8b:07:0e:a8:49:cc:d8:1f:71"]

  # Run once only
  user_data = templatefile("${path.module}/platform-api-droplet.yaml", {
    digitalocean_access_token = var.digitalocean_access_token,
    # Not used
    auth0_m2m_client_id     = "",
    auth0_m2m_client_secret = "",
    neo4j_uri               = var.neo4j_uri,
    neo4j_user              = var.neo4j_user,
    neo4j_password          = var.neo4j_password
  })

  # lifecycle {
  #   ignore_changes = [user_data]
  # }

  # Optional: Enable the DigitalOcean agent
  droplet_agent = true
}

locals {
  next_public_platform_api_hostname = digitalocean_droplet.platform-api.ipv4_address_private
  next_public_platform_api_port = 4000
}

resource "digitalocean_firewall" "platform_api_firewall" {
  name = "platform-api-firewall"

  droplet_ids = [
    digitalocean_droplet.platform-api.id,
  ]

  # Allows SSH access from specific IP ranges for secure shell administration.
  inbound_rule {
    protocol   = "tcp"
    port_range = "22"
    # source_addresses = ["192.168.1.0/24", "2002:1:2::/48"]
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  # Allows HTTP traffic from anywhere, typically for serving websites or APIs.
  inbound_rule {
    protocol         = "tcp"
    port_range       = "80"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  # Allows HTTPS traffic from anywhere, essential for secure web communications.
  inbound_rule {
    protocol         = "tcp"
    port_range       = "443"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  # Allows ICMP traffic (e.g., ping) for network diagnostics and troubleshooting.
  inbound_rule {
    protocol         = "icmp"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  # Allows outbound HTTP traffic for fetching updates, etc.
  outbound_rule {
    protocol              = "tcp"
    port_range            = "80"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  # Allows outbound HTTPS traffic for secure communications.
  outbound_rule {
    protocol              = "tcp"
    port_range            = "443"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  # Allows outbound TCP DNS queries to resolve domain names into IP addresses.
  outbound_rule {
    protocol              = "tcp"
    port_range            = "53"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  # Allows outbound UDP DNS queries, which are more common than TCP for DNS.
  outbound_rule {
    protocol              = "udp"
    port_range            = "53"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  # Allows outbound ICMP traffic for tasks like traceroute.
  outbound_rule {
    protocol              = "icmp"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
}

# resource "digitalocean_record" "platform-api" {
#   domain = digitalocean_domain.codelab_app.id
#   type   = "A"
#   name   = "api"
#   value  = digitalocean_droplet.platform-api.ipv4_address
#   ttl    = 3600
# }
