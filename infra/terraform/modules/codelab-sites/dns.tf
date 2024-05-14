resource "digitalocean_record" "sites_a_record" {
  domain = var.codelab_app_domain_id
  type   = "A"
  name   = "sites"
  value  = digitalocean_loadbalancer.web.ip
  ttl    = 3600
}

resource "digitalocean_record" "sites_cname" {
  domain = var.codelab_app_domain_id
  type   = "CNAME"
  name   = "www.sites"
  value  = "sites.codelab.app."
  ttl    = 3600
}
