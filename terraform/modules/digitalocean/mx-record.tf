resource "digitalocean_record" "mx" {
  domain   = digitalocean_domain.codelab_app.name
  type     = "MX"
  name     = "@"
  value    = "aspmx.l.google.com."
  priority = 1
  ttl      = 14400
}

resource "digitalocean_record" "mx1" {
  domain   = digitalocean_domain.codelab_app.name
  type     = "MX"
  name     = "@"
  value    = "alt1.aspmx.l.google.com."
  priority = 5
  ttl      = 14400
}

resource "digitalocean_record" "mx2" {
  domain   = digitalocean_domain.codelab_app.name
  type     = "MX"
  name     = "@"
  value    = "alt2.aspmx.l.google.com."
  priority = 5
  ttl      = 14400
}

resource "digitalocean_record" "mx3" {
  domain   = digitalocean_domain.codelab_app.name
  type     = "MX"
  name     = "@"
  value    = "alt3.aspmx.l.google.com."
  priority = 10
  ttl      = 14400
}

resource "digitalocean_record" "mx4" {
  domain   = digitalocean_domain.codelab_app.name
  type     = "MX"
  name     = "@"
  value    = "alt4.aspmx.l.google.com."
  priority = 10
  ttl      = 14400
}
