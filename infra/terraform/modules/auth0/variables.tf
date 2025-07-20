# Variables for auth0 module

# Domain configuration
variable "auth0_domain" {
  type        = string
  description = "Auth0 client domain, obtained from Auth0 dashboard"
}

# E2E testing credentials
variable "auth0_e2e_username" {
  type        = string
  description = "E2e username for E2e specs"
}

variable "auth0_e2e_password" {
  type        = string
  description = "E2e user for Auth0, used in e2e testing"
  sensitive   = true
}

# Machine-to-machine credentials
variable "auth0_m2m_client_id" {
  type        = string
  description = "Auth0 machine client id"
}

variable "auth0_m2m_client_secret" {
  type        = string
  description = "Auth0 machine client secret"
  sensitive   = true
}

# Auth0 secret
variable "auth0_secret" {
  type        = string
  description = "Auth0 secret for creating JWT tokens"
  sensitive   = true
}

# Web host configuration
variable "next_public_web_host" {
  type        = string
  description = "Domain of our project (e.g., https://codelab.app)"
}