resource "digitalocean_domain" "codelab_app" {
  name = "codelab.app"
}

resource "digitalocean_certificate" "codelab_app" {
  name    = "codelab-landing-1"
  type    = "lets_encrypt"
  domains = ["codelab.app", "*.codelab.app"]


  lifecycle {
    create_before_destroy = true
  }
}
