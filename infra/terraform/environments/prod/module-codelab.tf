# Core infrastructure module for prod environment
module "codelab" {
  source = "../../modules/codelab"

  digitalocean_access_token = var.DIGITALOCEAN_ACCESS_TOKEN
  digitalocean_region       = local.digitalocean_region
}