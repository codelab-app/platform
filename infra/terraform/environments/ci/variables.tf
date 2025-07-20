# Variables for CI environment
# These map to Terraform Cloud workspace variables (UPPERCASE)

# DigitalOcean
variable "DIGITALOCEAN_ACCESS_TOKEN" {
  type        = string
  description = "DigitalOcean API access token"
  sensitive   = true
}

variable "DIGITALOCEAN_API_TOKEN" {
  type        = string
  description = "DigitalOcean API token"
  sensitive   = true
}

variable "DIGITALOCEAN_DROPLET_NAME" {
  type        = string
  description = "Base name for droplets"
  default     = "codelab"
}

# Auth0
variable "AUTH0_DOMAIN" {
  type        = string
  description = "Auth0 domain"
}

variable "AUTH0_M2M_CLIENT_ID" {
  type        = string
  description = "Auth0 M2M client ID"
}

variable "AUTH0_M2M_CLIENT_SECRET" {
  type        = string
  description = "Auth0 M2M client secret"
  sensitive   = true
}

variable "AUTH0_E2E_USERNAME" {
  type        = string
  description = "Auth0 E2E username"
}

variable "AUTH0_E2E_PASSWORD" {
  type        = string
  description = "Auth0 E2E password"
  sensitive   = true
}

variable "AUTH0_SECRET" {
  type        = string
  description = "Auth0 secret"
  sensitive   = true
}

# Docker
variable "DOCKER_TAG_VERSION" {
  type        = string
  description = "Docker image tag"
}

variable "DOCKERHUB_USERNAME" {
  type        = string
  description = "Docker Hub username"
}

variable "DOCKERHUB_ACCESS_TOKEN" {
  type        = string
  description = "Docker Hub access token"
  sensitive   = true
}

# Neo4j
variable "NEO4J_USER" {
  type        = string
  description = "Neo4j username"
  default     = "neo4j"
}

variable "NEO4J_PASSWORD" {
  type        = string
  description = "Neo4j password"
  sensitive   = true
}

# API
variable "NEXT_PUBLIC_API_HOSTNAME" {
  type        = string
  description = "API hostname"
}

variable "NEXT_PUBLIC_API_PORT" {
  type        = number
  description = "API port"
  default     = 3333
}

variable "NEXT_PUBLIC_BASE_API_PATH" {
  type        = string
  description = "API base path"
  default     = "/api"
}

variable "API_LOG_LEVEL" {
  type        = string
  description = "API log level"
  default     = "info"
}

variable "DEBUG" {
  type        = bool
  description = "Debug mode"
  default     = false
}

# Web
variable "NEXT_PUBLIC_WEB_HOST" {
  type        = string
  description = "Web host URL"
}

# Monitoring
variable "LOKI_URL" {
  type        = string
  description = "Loki URL"
  default     = ""
}

variable "PROMETHEUS_WRITE_URL" {
  type        = string
  description = "Prometheus write URL"
  default     = ""
}

variable "PROMETHEUS_USERNAME" {
  type        = string
  description = "Prometheus username"
  default     = ""
}

variable "PROMETHEUS_PASSWORD" {
  type        = string
  description = "Prometheus password"
  sensitive   = true
  default     = ""
}

# CI/CD
variable "CIRCLECI_TOKEN" {
  type        = string
  description = "CircleCI token"
  sensitive   = true
}

# Slack
variable "SLACK_ACCESS_TOKEN" {
  type        = string
  description = "Slack access token"
  sensitive   = true
}

variable "SLACK_DEFAULT_CHANNEL" {
  type        = string
  description = "Slack default channel"
}

# NX Cloud
variable "NX_CLOUD_ACCESS_TOKEN" {
  type        = string
  description = "NX Cloud access token"
  sensitive   = true
}

# Sentry
variable "SENTRY_AUTH_TOKEN" {
  type        = string
  description = "Sentry authentication token"
  sensitive   = true
  default     = ""
}

# Supabase
variable "NEXT_PUBLIC_SUPABASE_URL" {
  type        = string
  description = "Supabase URL"
  default     = ""
}

variable "NEXT_PUBLIC_SUPABASE_KEY" {
  type        = string
  description = "Supabase anon key"
  default     = ""
}

# Terraform Cloud
variable "TERRAFORM_USER_TOKEN" {
  type        = string
  description = "Terraform Cloud user token"
  sensitive   = true
  default     = ""
}

variable "TERRAFORM_ORGANIZATION_TOKEN" {
  type        = string
  description = "Terraform Cloud organization token"
  sensitive   = true
  default     = ""
}

# Default region (not from Terraform Cloud)
variable "digitalocean_region" {
  type        = string
  description = "DigitalOcean region"
  default     = "nyc3"
}