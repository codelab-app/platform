

# These don't come from Terraform cloud, but from outputs of another Auth0 module
# We can't put this in `modules/auth0` since it is not an input, but an output used by other modules
variable "auth0_m2m_client_id" {
  type        = string
  description = "Auth0 machine client id"
}

variable "auth0_m2m_client_secret" {
  type        = string
  description = "Auth0 machine client secret"
}
