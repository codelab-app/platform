resource "digitalocean_record" "landing_a_record" {
  domain = var.codelab_app_domain_id
  type   = "A"
  name   = "@"
  # Changed from load balancer IP to droplet IP (using Caddy for SSL)
  value  = digitalocean_droplet.codelab_landing.ipv4_address
  ttl    = 3600
}

resource "digitalocean_record" "landing_cname" {
  domain = var.codelab_app_domain_id
  type   = "CNAME"
  name   = "www"
  value  = "@"
  ttl    = 3600
}
