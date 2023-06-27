resource "vercel_project" "platform_api" {
  name = "platform-api"
  framework = "nextjs"
  team_id = var.vercel_team_id

  git_repository = {
    type = "github"
    repo = "codelab-app/platform"
    production_branch = "master"
  }

  build_command    = "./scripts/vercel/platform-api/build.sh"
  output_directory = "dist/apps/platform-api"
  install_command  = "./scripts/vercel/platform-api/install.sh"

  environment = [
    {
      target = ["production", "preview"]
      key    = "PLATFORM_API_HOST"
      value  = var.platform_api_host
    }
  ]
}
