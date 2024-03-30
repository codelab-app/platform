variable "auth0_issuer_base_url" {
  type        = string
  description = "OIDC issuer URL, the endpoint of the provider we're authorizing against"
}

variable "auth0_audience" {
  type = string
}

variable "auth0_domain" {
  type        = string
  description = "Auth0 client domain, obtained from Auth0 dashboard"
}
