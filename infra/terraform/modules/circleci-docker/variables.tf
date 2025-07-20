# Variables for circleci-docker module

# Docker Hub configuration
variable "dockerhub_username" {
  type        = string
  description = "Docker Hub username"
}

variable "dockerhub_access_token" {
  type        = string
  description = "Docker Hub access token"
  sensitive   = true
}

variable "docker_tag_version" {
  type        = string
  description = "Docker image tag version"
}

# Auth0 configuration
variable "auth0_domain" {
  type        = string
  description = "Auth0 domain"
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

variable "auth0_secret" {
  type        = string
  description = "Auth0 secret for JWT tokens"
  sensitive   = true
}

# Web configuration
variable "next_public_web_host" {
  type        = string
  description = "Web application host URL"
}

# API configuration
variable "next_public_api_hostname" {
  type        = string
  description = "API hostname"
}

variable "next_public_api_port" {
  type        = number
  description = "API port"
}

# CircleCI configuration
variable "circleci_token" {
  type        = string
  description = "CircleCI API token"
  sensitive   = true
}