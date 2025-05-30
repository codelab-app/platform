# Use 2 load balancer so we don't need any routing rules
resource "digitalocean_loadbalancer" "sites" {
  name   = "sites-load-balancer"
  region = var.digitalocean_region

  vpc_uuid = var.codelab_app_vpc_id

  # https://github.com/digitalocean/terraform-provider-digitalocean/issues/456
  disable_lets_encrypt_dns_records = true

  droplet_ids = [
    digitalocean_droplet.codelab_sites.id,
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
