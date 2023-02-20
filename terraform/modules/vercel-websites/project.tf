# A project that is connected to a git repository.
# Deployments will be created automatically
# on every branch push and merges onto the Production Branch.
resource "vercel_project" "websites" {
  name      = "websites"
  framework = "nextjs"
  team_id   = var.vercel_team_id

  git_repository = {
    type = "github"
    repo = "codelab-app/platform"
  }

  build_command    = "./scripts/vercel/websites/build.sh"
  output_directory = "dist/apps/websites/.next"
  install_command  = "./scripts/vercel/websites/install.sh"

  serverless_function_region = "sfo1"

  environment = [
    {
      target = ["production", "preview"]
      key    = "NEXT_PUBLIC_BUILDER_HOST"
      value  = var.next_public_builder_host
    }
  ]
}

