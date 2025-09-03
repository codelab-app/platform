variable "digitalocean_region" {
  type        = string
  description = "DigitalOcean region"
}

variable "codelab_app_vpc_id" {
  type        = string
  description = "VPC ID for Codelab app"
}

variable "codelab_app_domain" {
  type        = string
  description = "Domain name for Codelab app"
}

variable "vpc_cidr" {
  type        = string
  description = "VPC CIDR block"
  default     = "10.116.0.0/20"
}

variable "grafana_admin_password" {
  type        = string
  description = "Grafana admin password"
  sensitive   = true
}

variable "domain" {
  type        = string
  description = "Base domain for services"
}

