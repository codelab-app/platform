# Variables for the codelab module
# This module creates core infrastructure: VPC, DNS, Certificate, Container Registry

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

# Module-specific variables can be added here as needed