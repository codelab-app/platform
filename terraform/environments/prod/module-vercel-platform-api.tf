module "vercel-platform-api" {
  source = "../../modules/vercel-platform-api"

  platform_api_host = var.PLATFORM_API_HOST
  vercel_team_id    = var.VERCEL_TEAM_ID

  neo4j_password = var.NEO4J_PASSWORD
  neo4j_uri      = var.NEO4J_URI
  neo4j_user     = var.NEO4J_USER
}
