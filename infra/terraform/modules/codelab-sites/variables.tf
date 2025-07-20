# Variables for the codelab-sites module
# This module deploys the sites/preview infrastructure

# Original module-specific variable
variable "next_public_web_host" {
  type        = string
  description = "Domain of our project"
}

# Infrastructure dependencies from other modules
variable "codelab_app_vpc_id" {
  type        = string
  description = "VPC ID from codelab module"
}

variable "codelab_app_domain_id" {
  type        = string
  description = "Domain ID from codelab module"
}

variable "codelab_app_certificate_id" {
  type        = string
  description = "Certificate ID from codelab module"
}

# DigitalOcean configuration
variable "digitalocean_access_token" {
  type        = string
  description = "DigitalOcean API access token"
  sensitive   = true
}

variable "digitalocean_region" {
  type        = string
  description = "DigitalOcean region for resources"
  default     = "nyc3"
}

# API configuration
variable "next_public_api_hostname" {
  type        = string
  description = "API hostname"
}

variable "next_public_api_port" {
  type        = number
  description = "API port"
  default     = 3333
}

# Docker configuration
variable "docker_tag_version" {
  type        = string
  description = "Docker image tag version"
}

# Monitoring configuration
variable "loki_url" {
  type        = string
  description = "Loki URL for log aggregation"
}