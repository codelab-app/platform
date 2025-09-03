/**
 * Consul Provider Configuration
 * 
 * IMPORTANT: For Terraform Cloud
 * Since Terraform Cloud runs remotely, we can't use localhost or environment variables.
 * The provider needs the actual Consul server IP to write KV configuration.
 * 
 * Two-stage apply process:
 * 1. First apply with -target=module.consul creates the server
 * 2. Second apply uses the server's IP to write configuration to Consul KV
 */
provider "consul" {
  # Must use actual server IP for Terraform Cloud (runs remotely, can't use localhost)
  address    = "${module.consul.consul_server_public_ip}:8500"
  datacenter = "dc1"
}

module "consul" {
  source = "../../modules/consul"

  digitalocean_region       = local.digitalocean_region
  vpc_id                    = module.codelab.codelab_app_vpc_id
  digitalocean_access_token = var.DIGITALOCEAN_ACCESS_TOKEN
}

/**
 * Consul KV Configuration Sync
 *
 * Maintains all application configuration in Consul KV store.
 * Values are sourced from Terraform Cloud variables and modules.
 */
resource "consul_keys" "global_config" {
  # Global/shared configuration used by multiple services
  key {
    path  = "config/domain"
    value = "codelab.app"
  }
  
  key {
    path  = "config/environment"
    value = var.ENVIRONMENT
  }
  
  key {
    path  = "config/digitalocean/api_token"
    value = var.DIGITALOCEAN_API_TOKEN
  }
  
  # Global monitoring settings
  key {
    path  = "config/monitoring/enabled"
    value = "true"
  }
  
  # Feature flags (can be overridden in Consul UI)
  key {
    path  = "config/features/new_ui"
    value = "false"
  }
  
  key {
    path  = "config/features/dark_mode"
    value = "false"
  }
  
  key {
    path  = "config/features/beta_api"
    value = "false"
  }

  depends_on = [module.consul]
}