module "codelab_landing" {
  source = "../../modules/codelab-landing"

  digitalocean_access_token = var.DIGITALOCEAN_ACCESS_TOKEN
  docker_tag_version        = var.DOCKER_TAG_VERSION

  loki_url = var.LOKI_URL

  codelab_app_domain_id      = module.codelab.codelab_app_domain_id
  codelab_app_vpc_id         = module.codelab.codelab_app_vpc_id
  codelab_app_certificate_id = module.codelab.codelab_app_certificate_id
}
