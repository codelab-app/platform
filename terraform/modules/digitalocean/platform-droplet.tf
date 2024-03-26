resource "digitalocean_droplet" "platform" {
  image  = "docker-20-04"
  name   = "platform"
  region = "sfo2"
  size   = "s-1vcpu-1gb"

  backups    = true
  monitoring = true
  ipv6       = true

  vpc_uuid = digitalocean_vpc.platform_vpc.id

  # Taken from DO security SSH keys
  ssh_keys = ["31:0e:90:12:06:a2:9f:8b:07:0e:a8:49:cc:d8:1f:71"]

  # Run once only
  user_data = file("${path.module}/platform-droplet.sh")

  lifecycle {
    # ignore_changes = [user_data]
  }

  # Optional: Enable the DigitalOcean agent
  droplet_agent = true
}

resource "digitalocean_firewall" "platform_firewall" {
  name = "platform-app-firewall"

  droplet_ids = [
    digitalocean_droplet.platform.id,
  ]

  # Allows SSH access from specific IP ranges for secure shell administration.
  inbound_rule {
    protocol         = "tcp"
    port_range       = "22"
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

resource "digitalocean_record" "platform_a_record" {
  domain = digitalocean_domain.codelab_app.name
  type   = "A"
  name   = "admin"
  value  = digitalocean_droplet.platform.ipv4_address
  ttl    = 3600
}

resource "digitalocean_record" "platform_cname" {
  domain = digitalocean_domain.codelab_app.name
  type   = "CNAME"
  name   = "www.admin"
  value  = "@"
  ttl    = 3600
}
