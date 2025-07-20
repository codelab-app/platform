# Variables for dev environment
# Dev environment only needs auth0-related variables

# Web configuration
variable "NEXT_PUBLIC_WEB_HOST" {
  type        = string
  description = "Web application host URL"
}

# Auth0 configuration
variable "AUTH0_DOMAIN" {
  type        = string
  description = "Auth0 domain"
}

variable "AUTH0_M2M_CLIENT_ID" {
  type        = string
  description = "Auth0 machine-to-machine client ID"
}

variable "AUTH0_M2M_CLIENT_SECRET" {
  type        = string
  description = "Auth0 machine-to-machine client secret"
  sensitive   = true
}

variable "AUTH0_E2E_USERNAME" {
  type        = string
  description = "Auth0 E2E test username"
}

variable "AUTH0_E2E_PASSWORD" {
  type        = string
  description = "Auth0 E2E test password"  
  sensitive   = true
}

variable "AUTH0_SECRET" {
  type        = string
  description = "Auth0 secret for JWT tokens"
  sensitive   = true
}