resource "digitalocean_loadbalancer" "neo4j" {
  name   = "neo4j-load-balancer"
  region = var.digitalocean_region

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

  forwarding_rule {
    entry_port     = 8080
    entry_protocol = "https"

    target_port     = 8080
    target_protocol = "http"

    certificate_name = var.codelab_app_certificate_id
  }

  healthcheck {
    port     = 22
    protocol = "tcp"
  }
}

resource "digitalocean_record" "neo4j_a_record" {
  domain = var.codelab_app_domain_id
  type   = "A"
  name   = "neo4j"
  value  = digitalocean_loadbalancer.neo4j.ip
  ttl    = 3600
}

resource "digitalocean_record" "neo4j_cadvisor_a_record" {
  domain = var.codelab_app_domain_id
  type   = "A"
  name   = "*.neo4j"
  value  = digitalocean_loadbalancer.neo4j.ip
  ttl    = 3600
}

resource "digitalocean_record" "neo4j_cadvisor_cname" {
  domain = var.codelab_app_domain_id
  type   = "CNAME"
  name   = "www.cadvisor.neo4j"
  value  = "cadvisor.neo4j.codelab.app."
  ttl    = 3600
}

resource "digitalocean_record" "neo4j_traefik_cname" {
  domain = var.codelab_app_domain_id
  type   = "CNAME"
  name   = "www.traefik.neo4j"
  value  = "traefik.neo4j.codelab.app."
  ttl    = 3600
}
