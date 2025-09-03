variable "domain" {
  type        = string
  description = "Domain for Grafana"
  default     = "codelab.app"
}

variable "GRAFANA_ADMIN_PASSWORD" {
  type        = string
  description = "Grafana admin password"
  sensitive   = true
}