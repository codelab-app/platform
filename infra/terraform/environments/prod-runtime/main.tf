terraform {
  required_version = ">= 1.13.0"

  required_providers {
    grafana = {
      source  = "grafana/grafana"
      version = "~> 2.0"
    }
  }

  cloud {
    organization = "codelab-app"

    workspaces {
      name = "prod-runtime"
    }
  }
}

module "grafana_dashboards" {
  source = "../../modules/grafana-dashboards"

  domain                 = var.domain
  grafana_admin_password = var.GRAFANA_ADMIN_PASSWORD
}
