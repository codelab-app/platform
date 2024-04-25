# Create a new Load Balancer with TLS termination
resource "digitalocean_loadbalancer" "landing" {
  name   = "landing-load-balancer"
  region = "sfo2"

  vpc_uuid = var.codelab_app_vpc_id

  droplet_ids = [
    digitalocean_droplet.codelab_landing.id,
  ]

  forwarding_rule {
    entry_port     = 443
    entry_protocol = "https"

    target_port     = 80
    target_protocol = "http"

    certificate_name = var.codelab_app_certificate_id
  }

  healthcheck {
    port     = 22
    protocol = "tcp"
  }
}

resource "digitalocean_record" "landing_a_record" {
  domain = var.codelab_app_domain_id
  type   = "A"
  name   = "@"
  value  = digitalocean_loadbalancer.landing.ip
  ttl    = 3600
}

resource "digitalocean_record" "landing_cname" {
  domain = var.codelab_app_domain_id
  type   = "CNAME"
  name   = "www"
  value  = "@"
  ttl    = 3600
}
