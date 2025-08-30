resource "digitalocean_firewall" "codelab_landing" {
  name = "landing-app-firewall"

  droplet_ids = [
    digitalocean_droplet.codelab_landing.id,
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

  # Allow outbound Consul communication to VPC
  # Port 8300: Server RPC
  # Port 8301: Serf LAN gossip (TCP and UDP)
  # Port 8302: Serf WAN gossip (TCP and UDP)
  # Port 8500: HTTP API
  # Port 8600: DNS
  outbound_rule {
    protocol              = "tcp"
    port_range            = "8300-8302"
    destination_addresses = ["10.104.0.0/20"] # VPC CIDR
  }

  outbound_rule {
    protocol              = "udp"
    port_range            = "8301-8302"
    destination_addresses = ["10.104.0.0/20"] # VPC CIDR
  }

  outbound_rule {
    protocol              = "tcp"
    port_range            = "8500"
    destination_addresses = ["10.104.0.0/20"] # VPC CIDR
  }

  outbound_rule {
    protocol              = "tcp"
    port_range            = "8600"
    destination_addresses = ["10.104.0.0/20"] # VPC CIDR
  }

  outbound_rule {
    protocol              = "udp"
    port_range            = "8600"
    destination_addresses = ["10.104.0.0/20"] # VPC CIDR
  }
}
