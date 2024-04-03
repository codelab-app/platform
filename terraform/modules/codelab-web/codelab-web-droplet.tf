resource "digitalocean_droplet" "web" {
  image  = "docker-20-04"
  name   = "web"
  region = "sfo2"
  size   = "s-1vcpu-1gb"

  backups    = true
  monitoring = true
  ipv6       = true

  vpc_uuid = var.codelab_app_vpc_id

  # Taken from DO security SSH keys
  ssh_keys = ["31:0e:90:12:06:a2:9f:8b:07:0e:a8:49:cc:d8:1f:71"]

  # Run once only
  user_data = templatefile("${path.module}/codelab-web-droplet.yaml", {
    digitalocean_access_token = var.digitalocean_access_token,
    next_public_web_host      = var.next_public_web_host,
    next_public_api_port      = var.next_public_api_port,
    next_public_api_hostname  = var.next_public_api_hostname,
    auth0_secret              = var.auth0_secret,
    auth0_domain              = var.auth0_domain,
    auth0_client_id           = var.auth0_web_client_id,
    auth0_client_secret       = var.auth0_web_client_secret,
  })

  lifecycle {
    # ignore_changes = [user_data]
  }

  # Optional: Enable the DigitalOcean agent
  droplet_agent = true
}

resource "digitalocean_firewall" "web_firewall" {
  name = "codelab-web-firewall"

  droplet_ids = [
    digitalocean_droplet.web.id,
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

