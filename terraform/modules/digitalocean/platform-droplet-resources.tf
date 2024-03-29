# Use 2 load balancer so we don't need any routing rules
resource "digitalocean_loadbalancer" "platform" {
  name   = "platform-load-balancer"
  region = "sfo2"

  vpc_uuid = digitalocean_vpc.codelab_app.id

  droplet_ids = [
    digitalocean_droplet.platform.id,
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

resource "digitalocean_record" "platform_a_record" {
  domain = digitalocean_domain.codelab_app.id
  type   = "A"
  name   = "admin"
  value  = digitalocean_loadbalancer.platform.ip
  ttl    = 3600
}

resource "digitalocean_record" "platform_cname" {
  domain = digitalocean_domain.codelab_app.id
  type   = "CNAME"
  name   = "www.admin"
  value  = "admin.codelab.app."
  ttl    = 3600
}
