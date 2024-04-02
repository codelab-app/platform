# Use 2 load balancer so we don't need any routing rules
resource "digitalocean_loadbalancer" "web" {
  name   = "web-load-balancer"
  region = "sfo2"

  vpc_uuid = var.codelab_app_vpc_id

  droplet_ids = [
    digitalocean_droplet.web.id,
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
  value  = digitalocean_loadbalancer.web.ip
  ttl    = 3600
}

resource "digitalocean_record" "platform_cname" {
  domain = digitalocean_domain.codelab_app.id
  type   = "CNAME"
  name   = "www.admin"
  value  = "admin.codelab.app."
  ttl    = 3600
}
