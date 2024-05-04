locals {
  auth0_issuer_base_url = "https://${var.auth0_domain}/"
  auth0_audience        = "https://${var.auth0_domain}/api/v2/"
}
