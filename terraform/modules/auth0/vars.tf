variable "next_public_platform_host" {
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

variable "auth0_cypress_username" {
  type        = string
  description = "Cypress username for E2e specs"
}

variable "auth0_cypress_password" {
  type        = string
  description = "Cypress user for Auth0, used in e2e testing"
}


