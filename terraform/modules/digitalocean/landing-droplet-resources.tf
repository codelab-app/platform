# Create a new Load Balancer with TLS termination
resource "digitalocean_loadbalancer" "landing" {
  name   = "landing-load-balancer"
  region = "sfo2"

  vpc_uuid = digitalocean_vpc.codelab_app.id

  droplet_ids = [
    digitalocean_droplet.landing.id,
  ]

  forwarding_rule {
    entry_port     = 443
    entry_protocol = "https"

    target_port     = 80
    target_protocol = "http"

    certificate_name = digitalocean_certificate.codelab_app.name
  }

  healthcheck {
    port     = 22
    protocol = "tcp"
  }
}

resource "digitalocean_record" "landing_a_record" {
  domain = digitalocean_domain.codelab_app.id
  type   = "A"
  name   = "@"
  value  = digitalocean_loadbalancer.landing.ip
  ttl    = 3600
}

resource "digitalocean_record" "landing_cname" {
  domain = digitalocean_domain.codelab_app.id
  type   = "CNAME"
  name   = "www"
  value  = "@"
  ttl    = 3600
}
