variable "VERCEL_API_TOKEN" {
  type        = string
  description = "Vercel Access Tokens are required to authenticate and use the Vercel API"
}

variable "NEXT_PUBLIC_LANDING_HOST" {
  type        = string
  description = "Codelab landing page URL"
}

variable "VERCEL_TEAM_ID" {
  type        = string
  description = "ID of the Vercel team"
}

variable "VERCEL_BUILDER_PROJECT_ID" {
  type        = string
  description = "Project ID of the builder project"
}

variable "AUTH0_SECRET" {
  type        = string
  description = "Auth0 secret for creating JWT tokens"
}
