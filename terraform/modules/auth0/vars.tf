variable "codelab_domain_url" {
  type        = string
  description = "Domain of our project"
}

variable "auth0_issuer_base_url" {
  type        = string
  description = "OIDC issuer URL, the endpoint of the provider we're authorizing against"
}

variable "auth0_domain" {
  type        = string
  description = "Auth0 client domain, obtained from Auth0 dashboard"
}

variable "auth0_client_id" {
  type        = string
  description = "Client id of the M2M client created for Terraform to provision"
}

variable "auth0_client_secret" {
  type        = string
  description = "Client secret of the M2M client created for Terraform to provision"
}

variable "auth0_cypress_password" {
  type        = string
  description = "Cypress user for Auth0, used in e2e testing"
}
