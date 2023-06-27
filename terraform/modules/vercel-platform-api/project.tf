resource "vercel_project" "platform" {
  name = "platform-api"
  framework = "other"
  team_id = var.vercel_team_id

  git_repository = {
    type = "github"
    repo = "codelab-app/platform"
  }

  build_command    = "./scripts/vercel/platform/build.sh"
  output_directory = "dist/apps/platform-api"
  install_command  = "./scripts/vercel/platform/install.sh"

}
