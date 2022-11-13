variable "vercel_api_token" {
  type        = string
  description = "Vercel Access Tokens are required to authenticate and use the Vercel API"
}

variable "next_public_landing_host" {
  type        = string
  description = "Codelab landing page URL"
}

variable "vercel_team_id" {
  type        = string
  description = "ID of the Vercel team"
}

variable "vercel_builder_project_id" {
  type        = string
  description = "Project ID of the builder project"
}

variable "auth0_secret" {
  type        = string
  description = "Auth0 secret for creating JWT tokens"
}
