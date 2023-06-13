module "redis" {
  source = "../../modules/redis"

  digitalocean_token = var.DIGITALOCEAN_TOKEN
}
