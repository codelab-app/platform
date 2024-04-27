resource "digitalocean_domain" "codelab_app" {
  name = "codelab.app"
}

resource "digitalocean_certificate" "codelab_app" {
  name = "codelab-app"
  type = "lets_encrypt"
  # https://serverfault.com/questions/310530/should-a-wildcard-ssl-certificate-secure-both-the-root-domain-as-well-as-the-sub
  domains = ["codelab.app", "*.codelab.app"]

  lifecycle {
    create_before_destroy = true
  }
}
