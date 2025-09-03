terraform {
  required_version = "1.7.0"

  required_providers {
    grafana = {
      source  = "grafana/grafana"
      version = "~> 2.0"
    }
  }

  cloud {
    organization = "codelab-app"

    workspaces {
      name = "prod-grafana-dashboards"
    }
  }
}

module "grafana_dashboards" {
  source = "../../modules/grafana-dashboards"

  domain                 = var.domain
  grafana_admin_password = var.GRAFANA_ADMIN_PASSWORD
}