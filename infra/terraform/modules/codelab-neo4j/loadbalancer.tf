resource "digitalocean_loadbalancer" "neo4j" {
  name   = "neo4j-load-balancer"
  region = var.digitalocean_region

  # https://github.com/digitalocean/terraform-provider-digitalocean/issues/456
  disable_lets_encrypt_dns_records = true

  vpc_uuid = var.codelab_app_vpc_id

  droplet_ids = [
    digitalocean_droplet.neo4j.id,
  ]

  forwarding_rule {
    entry_port     = 443
    entry_protocol = "https"

    target_port     = 80
    target_protocol = "http"

    certificate_name = var.codelab_app_certificate_id
  }

  # forwarding_rule {
  #   entry_port     = 8080
  #   entry_protocol = "https"

  #   target_port     = 8080
  #   target_protocol = "http"

  #   certificate_name = var.codelab_app_certificate_id
  # }

  healthcheck {
    port     = 22
    protocol = "tcp"
  }
}
