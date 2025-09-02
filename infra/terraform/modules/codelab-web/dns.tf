resource "digitalocean_record" "web_a_record" {
  domain = var.codelab_app_domain_id
  type   = "A"
  name   = "dev"
  # Changed from load balancer IP to droplet IP (using Caddy for SSL)
  value  = digitalocean_droplet.codelab_web.ipv4_address
  ttl    = 3600
}

resource "digitalocean_record" "web_cname" {
  domain = var.codelab_app_domain_id
  type   = "CNAME"
  name   = "www.dev"
  value  = "dev.codelab.app."
  ttl    = 3600
}
