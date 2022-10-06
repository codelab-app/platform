module "auth0" {
  source                 = "./modules/auth0"
  auth0_issuer_base_url  = var.AUTH0_ISSUER_BASE_URL
  codelab_domain_url     = var.CODELAB_DOMAIN_URL
  auth0_domain           = var.AUTH0_DOMAIN
  auth0_client_id        = var.AUTH0_M2M_CLIENT_ID
  auth0_client_secret    = var.AUTH0_M2M_CLIENT_SECRET
  auth0_cypress_password = var.AUTH0_CYPRESS_PASSWORD
}
