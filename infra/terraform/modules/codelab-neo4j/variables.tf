# Variables for the codelab-neo4j module
# This module deploys the Neo4j database infrastructure

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

# Neo4j credentials (currently not used in templates, but should be)
variable "neo4j_user" {
  type        = string
  description = "Neo4j username"
  default     = "neo4j"
}

variable "neo4j_password" {
  type        = string
  description = "Neo4j password"
  sensitive   = true
}

# Monitoring configuration
variable "loki_url" {
  type        = string
  description = "Loki URL for log aggregation"
}

variable "prometheus_write_url" {
  type        = string
  description = "Prometheus write URL"
}

variable "prometheus_username" {
  type        = string
  description = "Prometheus username"
}

variable "prometheus_password" {
  type        = string
  description = "Prometheus password"
  sensitive   = true
}