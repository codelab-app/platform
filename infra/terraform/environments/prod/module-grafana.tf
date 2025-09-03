module "grafana" {
  source = "../../modules/grafana"

  digitalocean_region = local.digitalocean_region
  codelab_app_vpc_id  = module.codelab.codelab_app_vpc_id
  codelab_app_domain  = module.codelab.codelab_app_domain
  domain              = module.codelab.codelab_app_domain
  
  grafana_admin_password = var.GRAFANA_ADMIN_PASSWORD
}

# Dashboard provisioning is now handled via file provisioning in the grafana module
# No need for separate API-based dashboard module