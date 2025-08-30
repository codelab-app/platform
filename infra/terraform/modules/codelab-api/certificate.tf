# API sits in a VPC and has no internet access, so we can't use Lets Encrypt
#
# Ran `openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout codelab_api.key -out codelab_api.crt -subj "/CN=codelab.internal/O=Codelab/C=US"`

# Since API cert is custom and rarely changes, keeping static name is fine
# The cert is not used by any load balancer (API runs HTTP internally)
resource "digitalocean_certificate" "api" {
  name = "codelab-api-certificate"
  type = "custom"

  private_key      = var.codelab_api_key
  leaf_certificate = var.codelab_api_crt
}
