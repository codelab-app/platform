resource "digitalocean_record" "ns1" {
  domain = digitalocean_domain.codelab_app.id
  type   = "NS"
  name   = "@"
  value  = "ns1.digitalocean.com."
  ttl    = 1800
}

resource "digitalocean_record" "ns2" {
  domain = digitalocean_domain.codelab_app.id
  type   = "NS"
  name   = "@"
  value  = "ns2.digitalocean.com."
  ttl    = 1800
}

resource "digitalocean_record" "ns3" {
  domain = digitalocean_domain.codelab_app.id
  type   = "NS"
  name   = "@"
  value  = "ns3.digitalocean.com."
  ttl    = 1800
}
