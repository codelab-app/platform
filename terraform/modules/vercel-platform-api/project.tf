resource "vercel_project" "platform_api" {
  name = "platform-api"
  framework = "nextjs"
  team_id = var.vercel_team_id

  git_repository = {
    type = "github"
    repo = "codelab-app/platform"
    production_branch = "master"
  }

  root_directory = "apps/platform-api"

  build_command    = "../../scripts/vercel/platform-api/build.sh"
  install_command  = "../../scripts/vercel/platform-api/install.sh"
  ignore_command = "../../scripts/vercel/platform-api/ignore.sh"
  output_directory = "../../dist/apps/platform-api"

  environment = [
    {
      target = ["production", "preview"]
      key    = "PLATFORM_API_HOST"
      value  = var.platform_api_host
    }
  ]
}
