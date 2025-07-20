# Auth0 module for test environment

module "auth0" {
  source = "../../modules/auth0"

  next_public_web_host    = var.NEXT_PUBLIC_WEB_HOST
  auth0_domain            = var.AUTH0_DOMAIN
  auth0_m2m_client_id     = var.AUTH0_M2M_CLIENT_ID
  auth0_m2m_client_secret = var.AUTH0_M2M_CLIENT_SECRET
  auth0_e2e_username      = var.AUTH0_E2E_USERNAME
  auth0_e2e_password      = var.AUTH0_E2E_PASSWORD
  auth0_secret            = var.AUTH0_SECRET
}