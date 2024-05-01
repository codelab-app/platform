resource "digitalocean_certificate" "codelab_app" {
  name = "codelab-app-cert"
  type = "lets_encrypt"
  # https://serverfault.com/questions/310530/should-a-wildcard-ssl-certificate-secure-both-the-root-domain-as-well-as-the-sub
  domains = [
    "codelab.app",
    "*.codelab.app",
    "*.api.codelab.app",
    "*.neo4j.codelab.app"
  ]

  # Required https://registry.terraform.io/providers/digitalocean/digitalocean/latest/docs/resources/loadbalancer
  # In order to ensure the certificate is correctly updated when changed
  lifecycle {
    create_before_destroy = true
  }
}
