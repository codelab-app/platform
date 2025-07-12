resource "digitalocean_certificate" "codelab_app" {
  # Generate a unique name with timestamp suffix to handle create_before_destroy
  # When domains change, a new certificate with a different name will be created
  # before the old one is destroyed, preventing naming conflicts
  name = "codelab-app-${formatdate("YYYYMMDD-hhmmss", timestamp())}"
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
