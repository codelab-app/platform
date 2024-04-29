# Use 2 load balancer so we don't need any routing rules
resource "digitalocean_loadbalancer" "web" {
  name   = "web-load-balancer"
  region = var.digitalocean_region

  vpc_uuid = var.codelab_app_vpc_id

  droplet_ids = [
    digitalocean_droplet.codelab_web.id,
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

resource "digitalocean_record" "web_a_record" {
  domain = var.codelab_app_domain_id
  type   = "A"
  name   = "admin"
  value  = digitalocean_loadbalancer.web.ip
  ttl    = 3600
}

resource "digitalocean_record" "web_cname" {
  domain = var.codelab_app_domain_id
  type   = "CNAME"
  name   = "www.admin"
  value  = "admin.codelab.app."
  ttl    = 3600
}
