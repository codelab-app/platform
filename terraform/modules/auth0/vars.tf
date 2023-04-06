variable "next_public_platform_host" {
  type        = string
  description = "Domain of our project"
}

locals {
  # This has correct protocol added
  builder_url = startswith(var.next_public_platform_host, "127.0.0.1") ? "http://${var.next_public_platform_host}" : "https://${var.next_public_platform_host}"
}

variable "auth0_issuer_base_url" {
  type        = string
  description = "OIDC issuer URL, the endpoint of the provider we're authorizing against"
}

variable "auth0_domain" {
  type        = string
  description = "Auth0 client domain, obtained from Auth0 dashboard"
}

variable "auth0_m2m_client_id" {
  type        = string
  description = "Client id of the M2M client created for Terraform to provision"
}

variable "auth0_m2m_client_secret" {
  type        = string
  description = "Client secret of the M2M client created for Terraform to provision"
}

variable "auth0_cypress_username" {
  type        = string
  description = "Cypress username for E2e specs"
}

variable "auth0_cypress_password" {
  type        = string
  description = "Cypress user for Auth0, used in e2e testing"
}

variable "auth0_secret" {
  type        = string
  description = "Auth0 secret for creating JWT tokens"
}


