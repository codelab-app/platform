resource "digitalocean_record" "sites_a_record" {
  domain = var.codelab_app_domain_id
  type   = "A"
  name   = "sites"
  value  = digitalocean_loadbalancer.sites.ip
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
  value  = digitalocean_loadbalancer.sites.ip
  ttl    = 3600
}

# Wildcard DNS for staging subdomains (alternative to preview)
resource "digitalocean_record" "staging_wildcard" {
  domain = var.codelab_app_domain_id
  type   = "A"
  name   = "*.staging"
  value  = digitalocean_loadbalancer.sites.ip
  ttl    = 3600
}
