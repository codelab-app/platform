module "vercel-platform-api" {
  source = "../../modules/vercel-platform-api"

  platform_api_host = var.PLATFORM_API_HOST

  vercel_access_token        = var.VERCEL_ACCESS_TOKEN
  vercel_team_id             = var.VERCEL_TEAM_ID
  vercel_platform_project_id = var.VERCEL_PLATFORM_PROJECT_ID

  auth0_issuer_base_url = var.AUTH0_ISSUER_BASE_URL

  neo4j_password = var.NEO4J_PASSWORD
  neo4j_uri      = var.NEO4J_URI
  neo4j_user     = var.NEO4J_USER
}
