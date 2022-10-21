resource "vercel_project" "landing" {
  name = "landing"
  framework = "nextjs"
  team_id = var.VERCEL_TEAM_ID

  git_repository = {
    type = "github"
    repo = "codelab-app/builder"
  }

  build_command = "./scripts/vercel/landing/build.sh"
  output_directory = "dist/apps/builder/.next"
  install_command = "./scripts/vercel/landing/install.sh"

  serverless_function_region = "sfo1"
}
