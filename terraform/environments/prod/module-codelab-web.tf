module "codelab_web" {
  source = "../../modules/codelab-web"

  digitalocean_access_token = var.DIGITALOCEAN_ACCESS_TOKEN
  docker_tag_version        = var.DOCKER_TAG_VERSION

  next_public_web_host = var.NEXT_PUBLIC_WEB_HOST

  next_public_api_hostname = var.NEXT_PUBLIC_API_HOSTNAME
  next_public_api_port     = var.NEXT_PUBLIC_API_PORT

  auth0_domain            = var.AUTH0_DOMAIN
  auth0_secret            = var.AUTH0_SECRET
  auth0_web_client_id     = module.auth0.web_client.id
  auth0_web_client_secret = module.auth0.web_client.client_secret

  codelab_app_certificate_id = module.codelab.codelab_app_certificate_id
  codelab_app_vpc_id         = module.codelab.codelab_app_vpc_id
  codelab_app_domain_id      = module.codelab.codelab_app_domain_id

}
