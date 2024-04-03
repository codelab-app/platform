module "codelab_web" {
  source = "../../modules/codelab-web"

  digitalocean_access_token = var.DIGITALOCEAN_ACCESS_TOKEN

  next_public_web_host         = var.NEXT_PUBLIC_WEB_HOST
  codelab_app_vpc_id = module.codelab.codelab_app_vpc_id

  next_public_api_hostname = var.NEXT_PUBLIC_API_HOSTNAME
  next_public_api_port = var.NEXT_PUBLIC_API_PORT

  auth0_web_client_id = module.auth0.web_client.id
  auth0_web_client_secret = module.auth0.web_client.secret
  auth0_secret = var.AUTH0_SECRET
  # auth0_issuer_base_url = module.auth0.web_client.auth0_issuer_base_url
  auth0_issuer_base_url = module.auth0.web_client.auth0_issuer_base_url
  auth0_domain = module.auth0.web_client.domain
  auth0_audience = module.auth0.auth0_web_audience
  codelab_app_certificate_id = module.codelab.codelab_app_certificate_id
}
