# Landing page module for prod environment
module "codelab_landing" {
  source = "../../modules/codelab-landing"

  # Infrastructure dependencies
  codelab_app_vpc_id         = module.codelab.codelab_app_vpc_id
  codelab_app_domain_id      = module.codelab.codelab_app_domain_id
  codelab_app_certificate_id = module.codelab.codelab_app_certificate_id

  # DigitalOcean config
  digitalocean_access_token = var.DIGITALOCEAN_ACCESS_TOKEN
  digitalocean_region       = local.digitalocean_region

  # Docker
  docker_tag_version = var.DOCKER_TAG_VERSION

  # Monitoring
  loki_url = var.LOKI_URL
}