# Create a new Load Balancer with TLS termination
resource "digitalocean_loadbalancer" "landing" {
  name   = "landing-load-balancer"
  region = var.digitalocean_region

  # https://github.com/digitalocean/terraform-provider-digitalocean/issues/456
  disable_lets_encrypt_dns_records = true

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

  # Force load balancer to update when droplet changes
  lifecycle {
    replace_triggered_by = [digitalocean_droplet.codelab_landing.id]
  }
}
