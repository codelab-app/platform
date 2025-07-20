# Variables for the codelab-landing module
# This module deploys the landing page infrastructure

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