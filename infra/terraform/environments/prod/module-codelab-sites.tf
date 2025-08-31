module "codelab_sites" {
  source = "../../modules/codelab-sites"

  digitalocean_access_token = var.DIGITALOCEAN_ACCESS_TOKEN
  digitalocean_region       = local.digitalocean_region

  docker_tag_version = var.DOCKER_TAG_VERSION

  loki_url = var.LOKI_URL

  next_public_web_host = var.NEXT_PUBLIC_WEB_HOST

  next_public_api_hostname  = module.codelab_api.codelab_api_hostname
  next_public_api_port      = var.NEXT_PUBLIC_API_PORT
  next_public_base_api_path = var.NEXT_PUBLIC_BASE_API_PATH

  codelab_app_certificate_id = module.codelab.codelab_app_certificate_id
  codelab_app_vpc_id         = module.codelab.codelab_app_vpc_id
  codelab_app_domain_id      = module.codelab.codelab_app_domain_id
}
