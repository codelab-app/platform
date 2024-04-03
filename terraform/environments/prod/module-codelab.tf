module "codelab" {
  source = "../../modules/codelab"

  digitalocean_access_token = var.DIGITALOCEAN_ACCESS_TOKEN
}
