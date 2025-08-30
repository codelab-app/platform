# Use 2 load balancer so we don't need any routing rules
resource "digitalocean_loadbalancer" "web" {
  name   = "web-load-balancer"
  region = var.digitalocean_region

  vpc_uuid = var.codelab_app_vpc_id

  # https://github.com/digitalocean/terraform-provider-digitalocean/issues/456
  disable_lets_encrypt_dns_records = true

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

  # No need to replace load balancer when droplet changes since we use hostnames
}
