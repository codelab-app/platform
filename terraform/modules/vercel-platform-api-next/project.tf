resource "vercel_project" "platform_api_next" {
  name      = "platform-api-next"
  framework = "nextjs"
  team_id   = var.vercel_team_id

  git_repository = {
    type              = "github"
    repo              = "codelab-app/platform"
    production_branch = "master"
  }

  root_directory = "apps/platform-api-next"

  build_command    = "../../scripts/vercel/platform-api-next/build.sh"
  install_command  = "../../scripts/vercel/platform-api-next/install.sh"
  ignore_command   = "../../scripts/vercel/platform-api-next/ignore.sh"
  output_directory = "../../dist/apps/platform-api-next"

  environment = [
    {
      target = ["production", "preview"]
      key    = "PLATFORM_API_HOST"
      value  = var.platform_api_host
    }
  ]
}
