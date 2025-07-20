# Web application module for prod environment
module "codelab_web" {
  source = "../../modules/codelab-web"

  # Infrastructure dependencies
  codelab_app_vpc_id         = module.codelab.codelab_app_vpc_id
  codelab_app_domain_id      = module.codelab.codelab_app_domain_id
  codelab_app_certificate_id = module.codelab.codelab_app_certificate_id

  # DigitalOcean config
  digitalocean_access_token = var.DIGITALOCEAN_ACCESS_TOKEN
  digitalocean_region       = local.digitalocean_region

  # Auth0
  auth0_domain            = var.AUTH0_DOMAIN
  auth0_secret            = var.AUTH0_SECRET
  auth0_web_client_id     = module.auth0.web_client.client_id
  auth0_web_client_secret = module.auth0.web_client.client_secret

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