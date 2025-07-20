# Original API-specific variables
variable "codelab_api_key" {
  type = string
}

variable "codelab_api_crt" {
  type = string
}

# Variables that were previously symlinked from other modules
variable "codelab_app_vpc_id" {
  type        = string
  description = "VPC ID from codelab module"
}

variable "auth0_domain" {
  type        = string
  description = "Auth0 domain"
}

variable "neo4j_uri" {
  type        = string
  description = "Neo4j connection URI"
}

variable "neo4j_user" {
  type        = string
  description = "Neo4j username"
}

variable "neo4j_password" {
  type        = string
  description = "Neo4j password"
  sensitive   = true
}

variable "docker_tag_version" {
  type        = string
  description = "Docker image tag version"
}

variable "next_public_api_port" {
  type        = number
  description = "API port"
}

variable "loki_url" {
  type        = string
  description = "Loki URL for logging"
}

variable "digitalocean_region" {
  type        = string
  description = "DigitalOcean region"
}

variable "digitalocean_api_token" {
  type        = string
  description = "DigitalOcean API token"
  sensitive   = true
}

variable "digitalocean_droplet_name" {
  type        = string
  description = "DigitalOcean droplet name"
}

variable "digitalocean_access_token" {
  type        = string
  description = "DigitalOcean access token"
  sensitive   = true
}