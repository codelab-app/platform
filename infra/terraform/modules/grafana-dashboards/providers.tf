terraform {
  required_version = ">= 1.5.0"
  
  required_providers {
    grafana = {
      source  = "grafana/grafana"
      version = "~> 2.0"
    }
  }
}

provider "grafana" {
  url  = "https://grafana.${var.domain}"
  auth = "${var.grafana_admin_user}:${var.grafana_admin_password}"
}