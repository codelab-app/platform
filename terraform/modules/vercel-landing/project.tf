resource "vercel_project" "landing" {
  name      = "landing"
  framework = "nextjs"
  team_id   = var.vercel_team_id

  git_repository = {
    type = "github"
    repo = "codelab-app/builder"
  }

  ignore_command   = "git diff --quiet HEAD^ HEAD ./"
  build_command    = "./scripts/vercel/landing/build.sh"
  output_directory = "dist/apps/landing/.next"
  install_command  = "./scripts/vercel/landing/install.sh"

  serverless_function_region = "sfo1"
}
