# These don't come from Terraform cloud, but from outputs of another Auth0 module

variable "auth0_client_id" {
  type        = string
  description = "Auth0 web client id"
}

variable "auth0_client_secret" {
  type        = string
  description = "Auth0 web client secret"
}
