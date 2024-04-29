module "digitalocean-codelab" {
  source = "../../modules/digitalocean"

  digitalocean_access_token = var.DIGITALOCEAN_ACCESS_TOKEN
  digitalocean_region       = local.digitalocean_region
}
