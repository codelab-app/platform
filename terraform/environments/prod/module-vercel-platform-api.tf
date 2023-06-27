module "vercel-platform-api" {
  source = "../../modules/vercel-platform-api"

  platform_api_host =  var.PLATFORM_API_HOST
  vercel_team_id            = var.VERCEL_TEAM_ID
}
