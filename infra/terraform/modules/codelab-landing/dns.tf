resource "digitalocean_record" "landing_a_record" {
  domain = var.codelab_app_domain_id
  type   = "A"
  name   = "@"
  value  = digitalocean_loadbalancer.landing.ip
  ttl    = 3600
}

resource "digitalocean_record" "landing_cname" {
  domain = var.codelab_app_domain_id
  type   = "CNAME"
  name   = "www"
  value  = "@"
  ttl    = 3600
}
