# Don't symlink for now since we only require one
variable "auth0_issuer_base_url" {
  type        = string
  description = "OIDC issuer URL, the endpoint of the provider we're authorizing against"
}
