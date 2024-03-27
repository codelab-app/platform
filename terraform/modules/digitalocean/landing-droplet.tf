resource "digitalocean_droplet" "landing" {
  image  = "docker-20-04"
  name   = "landing"
  region = "sfo2"
  size   = "s-1vcpu-1gb"

  backups    = true
  monitoring = true
  ipv6       = true

  # vpc_uuid = digitalocean_vpc.platform_vpc.id

  # Taken from DO security SSH keys
  ssh_keys = ["31:0e:90:12:06:a2:9f:8b:07:0e:a8:49:cc:d8:1f:71"]

  # Run once only
  user_data = data.template_file.landing_user_data.rendered

  lifecycle {
    # ignore_changes = [user_data]
  }

  # Optional: Enable the DigitalOcean agent
  droplet_agent = true

  # tags = ["landing"]
}

resource "digitalocean_record" "landing_a_record" {
  domain = digitalocean_domain.codelab_app.name
  type   = "A"
  name   = "@"
  value  = digitalocean_droplet.landing.ipv4_address
  ttl    = 3600
}

resource "digitalocean_record" "landing_cname" {
  domain = digitalocean_domain.codelab_app.name
  type   = "CNAME"
  name   = "www"
  value  = "@"
  ttl    = 3600
}

resource "digitalocean_firewall" "landing_firewall" {
  name = "landing-app-firewall"

  droplet_ids = [
    digitalocean_droplet.landing.id,
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

resource "digitalocean_certificate" "landing_cert" {
  name    = "landing-certificate"
  type    = "lets_encrypt"
  domains = ["codelab.app"]

  lifecycle {
    create_before_destroy = true
  }
}

# Create a new Load Balancer with TLS termination
resource "digitalocean_loadbalancer" "public" {
  name        = "landing-load-balancer"
  region      = "sfo2"

  droplet_ids = [
    digitalocean_droplet.landing.id,
  ]

  forwarding_rule {
    entry_port     = 443
    entry_protocol = "https"

    target_port     = 80
    target_protocol = "http"

    certificate_name = digitalocean_certificate.landing_cert.name
  }

   healthcheck {
    port     = 22
    protocol = "tcp"
  }
}

data "template_file" "landing_user_data" {
  # Need template for variable interpolation
  template = file("${path.module}/landing-droplet.tpl")

  vars = {
    digitalocean_access_token = var.digitalocean_access_token

    mailchimp_list_id     = var.mailchimp_list_id
    mailchimp_api_key     = var.mailchimp_api_key
    mailchimp_server_prefix = var.mailchimp_server_prefix
  }
}
