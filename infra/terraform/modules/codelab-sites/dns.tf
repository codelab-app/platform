resource "digitalocean_record" "sites_a_record" {
  domain = var.codelab_app_domain_id
  type   = "A"
  name   = "sites"
  # Changed from load balancer IP to droplet IP (using Caddy for SSL)
  value  = digitalocean_droplet.codelab_sites.ipv4_address
  ttl    = 3600
}

resource "digitalocean_record" "sites_cname" {
  domain = var.codelab_app_domain_id
  type   = "CNAME"
  name   = "www.sites"
  value  = "sites.codelab.app."
  ttl    = 3600
}

# Wildcard DNS for preview subdomains
resource "digitalocean_record" "preview_wildcard" {
  domain = var.codelab_app_domain_id
  type   = "A"
  name   = "*.preview"
  # Changed from load balancer IP to droplet IP (using Caddy for SSL)
  value  = digitalocean_droplet.codelab_sites.ipv4_address
  ttl    = 3600
}

# Wildcard DNS for staging subdomains (alternative to preview)
# REMOVED: Not used
# resource "digitalocean_record" "staging_wildcard" {
#   domain = var.codelab_app_domain_id
#   type   = "A"
#   name   = "*.staging"
#   # Changed from load balancer IP to droplet IP (using Caddy for SSL)
#   value  = digitalocean_droplet.codelab_sites.ipv4_address
#   ttl    = 3600
# }
