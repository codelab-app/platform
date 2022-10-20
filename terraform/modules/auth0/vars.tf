variable "NEXT_PUBLIC_BUILDER_URL" {
  type        = string
  description = "Domain of our project"
}

variable "AUTH0_ISSUER_BASE_URL" {
  type        = string
  description = "OIDC issuer URL, the endpoint of the provider we're authorizing against"
}

variable "AUTH0_DOMAIN" {
  type        = string
  description = "Auth0 client domain, obtained from Auth0 dashboard"
}

variable "AUTH0_M2M_CLIENT_ID" {
  type        = string
  description = "Client id of the M2M client created for Terraform to provision"
}

variable "AUTH0_M2M_CLIENT_SECRET" {
  type        = string
  description = "Client secret of the M2M client created for Terraform to provision"
}

variable "AUTH0_CYPRESS_PASSWORD" {
  type        = string
  description = "Cypress user for Auth0, used in e2e testing"
}
