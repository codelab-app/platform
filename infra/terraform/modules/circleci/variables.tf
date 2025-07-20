# Variables for circleci module

# Web and API configuration
variable "next_public_web_host" {
  type        = string
  description = "Web application host URL"
}

variable "next_public_api_hostname" {
  type        = string
  description = "API hostname"
}

variable "next_public_api_port" {
  type        = number
  description = "API port"
}

variable "next_public_base_api_path" {
  type        = string
  description = "API base path"
}

# Debug and logging
variable "debug" {
  type        = bool
  description = "Enable debug mode"
  default     = false
}

variable "api_log_level" {
  type        = string
  description = "API log level"
  default     = "info"
}

# Auth0 configuration
variable "auth0_domain" {
  type        = string
  description = "Auth0 domain"
}

variable "auth0_e2e_username" {
  type        = string
  description = "Auth0 E2E test username"
}

variable "auth0_e2e_password" {
  type        = string
  description = "Auth0 E2E test password"
  sensitive   = true
}

variable "auth0_secret" {
  type        = string
  description = "Auth0 secret key"
  sensitive   = true
}

variable "auth0_web_client_id" {
  type        = string
  description = "Auth0 web client ID"
}

variable "auth0_web_client_secret" {
  type        = string
  description = "Auth0 web client secret"
  sensitive   = true
}

variable "auth0_m2m_client_id" {
  type        = string
  description = "Auth0 machine-to-machine client ID"
}

variable "auth0_m2m_client_secret" {
  type        = string
  description = "Auth0 machine-to-machine client secret"
  sensitive   = true
}

# CircleCI configuration
variable "circleci_token" {
  type        = string
  description = "CircleCI API token"
  sensitive   = true
}

variable "circleci_api_token" {
  type        = string
  description = "CircleCI API token (alternative name)"
  sensitive   = true
}

# Slack configuration
variable "slack_access_token" {
  type        = string
  description = "Slack access token"
  sensitive   = true
}

variable "slack_default_channel" {
  type        = string
  description = "Slack default channel"
}

# Terraform Cloud configuration
variable "terraform_user_token" {
  type        = string
  description = "Terraform Cloud user token"
  sensitive   = true
}

variable "terraform_organization_token" {
  type        = string
  description = "Terraform Cloud organization token"
  sensitive   = true
}

# Supabase configuration
variable "next_public_supabase_url" {
  type        = string
  description = "Supabase URL"
}

variable "next_public_supabase_key" {
  type        = string
  description = "Supabase anon key"
}

# NX Cloud
variable "nx_cloud_access_token" {
  type        = string
  description = "NX Cloud access token"
  sensitive   = true
}

# Docker configuration
variable "dockerhub_username" {
  type        = string
  description = "Docker Hub username"
}

variable "dockerhub_access_token" {
  type        = string
  description = "Docker Hub access token"
  sensitive   = true
}

# DigitalOcean configuration
variable "digitalocean_access_token" {
  type        = string
  description = "DigitalOcean API access token"
  sensitive   = true
}

variable "digitalocean_api_token" {
  type        = string
  description = "DigitalOcean API token"
  sensitive   = true
}

variable "digitalocean_droplet_name" {
  type        = string
  description = "Base name for droplets"
}

variable "docker_tag_version" {
  type        = string
  description = "Docker image tag version"
}

# Sentry configuration
variable "sentry_auth_token" {
  type        = string
  description = "Sentry authentication token"
  sensitive   = true
}