module "vercel-platform" {
  source = "../../modules/vercel-platform"

  depends_on = [module.auth0]

  next_public_platform_host = var.NEXT_PUBLIC_PLATFORM_HOST
  platform_api_host         = var.PLATFORM_API_HOST

  auth0_issuer_base_url = var.AUTH0_ISSUER_BASE_URL
  auth0_domain          = var.AUTH0_DOMAIN
  # auth0_m2m_client_id     = var.AUTH0_M2M_CLIENT_ID
  # auth0_m2m_client_secret = var.AUTH0_M2M_CLIENT_SECRET
  auth0_cypress_username = var.AUTH0_CYPRESS_USERNAME
  auth0_cypress_password = var.AUTH0_CYPRESS_PASSWORD
  auth0_secret           = var.AUTH0_SECRET

  auth0_web_client_id     = module.auth0.web_client.id
  auth0_web_client_secret = module.auth0.web_client.client_secret

  neo4j_password = var.NEO4J_PASSWORD
  neo4j_uri      = var.NEO4J_URI
  neo4j_user     = var.NEO4J_USER

  vercel_access_token        = var.VERCEL_ACCESS_TOKEN
  vercel_team_id             = var.VERCEL_TEAM_ID
  vercel_platform_project_id = var.VERCEL_PLATFORM_PROJECT_ID
}
