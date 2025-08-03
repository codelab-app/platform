# Random suffix to avoid name conflicts during cert replacement
# Keepers ensure name only changes when domains list changes
resource "random_pet" "cert_suffix" {
  keepers = {
    # Only regenerate when domains change
    domains = join(",", [
      "codelab.app",
      "*.codelab.app",
      "*.preview.codelab.app",
      "*.staging.codelab.app",
    ])
  }
}

resource "digitalocean_certificate" "codelab_app" {
  name = "codelab-app-${random_pet.cert_suffix.id}"
  type = "lets_encrypt"
  # https://serverfault.com/questions/310530/should-a-wildcard-ssl-certificate-secure-both-the-root-domain-as-well-as-the-sub
  domains = [
    "codelab.app",
    "*.codelab.app",
    "*.preview.codelab.app",
    "*.staging.codelab.app",
  ]

  # Required https://registry.terraform.io/providers/digitalocean/digitalocean/latest/docs/resources/loadbalancer
  # In order to ensure the certificate is correctly updated when changed
  # The order of operations: Create new certificate -> Update loadbalancer -> Delete old certificate
  lifecycle {
    create_before_destroy = true
  }
}
