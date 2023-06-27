module "vercel-platform-api-next" {
  source = "../../modules/vercel-platform-api-next"

  platform_api_host = var.PLATFORM_API_HOST
  vercel_team_id    = var.VERCEL_TEAM_ID
}
