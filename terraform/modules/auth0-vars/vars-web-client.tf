

# These don't come from Terraform cloud, but from outputs of another Auth0 module
# We can't put this in `modules/auth0` since it is not an input, but just re-useable variables
variable "auth0_web_client_id" {
  type        = string
  description = "Auth0 web client id"
}

variable "auth0_web_client_secret" {
  type        = string
  description = "Auth0 web client secret"
}
