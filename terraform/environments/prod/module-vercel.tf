provider "vercel" {
  # Or omit this for the api_token to be read
  # from the VERCEL_API_TOKEN environment variable
  api_token = var.VERCEL_API_TOKEN
  # "codelab" slug, id is more permanent
  team = var.VERCEL_TEAM_ID
}

module "vercel-builder" {
  source = "../../modules/vercel-builder"

  depends_on = [module.auth0]

  next_public_builder_host = var.NEXT_PUBLIC_BUILDER_HOST
  next_public_landing_host = var.NEXT_PUBLIC_LANDING_HOST

  auth0_issuer_base_url  = var.AUTH0_ISSUER_BASE_URL
  auth0_domain            = var.AUTH0_DOMAIN
  auth0_m2m_client_id     = var.AUTH0_M2M_CLIENT_ID
  auth0_m2m_client_secret = var.AUTH0_M2M_CLIENT_SECRET
  auth0_cypress_username = var.AUTH0_CYPRESS_USERNAME
  auth0_cypress_password  = var.AUTH0_CYPRESS_PASSWORD
  auth0_secret            = var.AUTH0_SECRET

  auth0_client_id     = module.auth0.web_client.id
  auth0_client_secret = module.auth0.web_client.client_secret

  neo4j_password = var.NEO4J_PASSWORD
  neo4j_uri      = var.NEO4J_URI
  neo4j_user     = var.NEO4J_USER

  vercel_api_token          = var.VERCEL_API_TOKEN
  vercel_team_id            = var.VERCEL_TEAM_ID
  vercel_builder_project_id = var.VERCEL_BUILDER_PROJECT_ID
}

module "vercel-landing" {
  source = "../../modules/vercel-landing"

  vercel_team_id           = var.VERCEL_TEAM_ID
  next_public_landing_host = var.NEXT_PUBLIC_LANDING_HOST
}

