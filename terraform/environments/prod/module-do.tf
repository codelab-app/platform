module "digitalocean-codelab" {
  source = "../../modules/digitalocean"

  digitalocean_access_token = var.DIGITALOCEAN_ACCESS_TOKEN
}
