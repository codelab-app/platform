variable "domain" {
  type        = string
  description = "Base domain for Grafana"
}

variable "grafana_admin_user" {
  type        = string
  description = "Grafana admin username"
  default     = "admin"
}

variable "grafana_admin_password" {
  type        = string
  description = "Grafana admin password"
  sensitive   = true
}