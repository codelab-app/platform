# Sites module (for preview environments) for prod environment
module "codelab_sites" {
  source = "../../modules/codelab-sites"

  # Infrastructure dependencies
  codelab_app_vpc_id         = module.codelab.codelab_app_vpc_id
  codelab_app_domain_id      = module.codelab.codelab_app_domain_id
  codelab_app_certificate_id = module.codelab.codelab_app_certificate_id

  # DigitalOcean config
  digitalocean_access_token = var.DIGITALOCEAN_ACCESS_TOKEN
  digitalocean_region       = local.digitalocean_region

  # API config
  next_public_api_hostname = module.codelab_api.codelab_api_hostname
  next_public_api_port     = var.NEXT_PUBLIC_API_PORT

  # Docker
  docker_tag_version = var.DOCKER_TAG_VERSION

  # Monitoring
  loki_url = var.LOKI_URL

  # Web config
  next_public_web_host = var.NEXT_PUBLIC_WEB_HOST
}