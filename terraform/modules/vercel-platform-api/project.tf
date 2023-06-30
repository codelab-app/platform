resource "vercel_project" "platform_api" {
  name      = "platform-api"
  framework = "nextjs"
  team_id   = var.vercel_team_id

  git_repository = {
    type              = "github"
    repo              = "codelab-app/platform"
    production_branch = "master"
  }

  root_directory = "apps/platform-api"

  build_command    = "../../scripts/vercel/platform-api/build.sh"
  install_command  = "../../scripts/vercel/platform-api/install.sh"
  ignore_command   = "../../scripts/vercel/platform-api/ignore.sh"
  output_directory = "../../dist/apps/platform-api/.next"

  environment = [
    {
      target = ["production", "preview"]
      key    = "PLATFORM_API_HOST"
      value  = var.platform_api_host
    },
    # Neo4j
    {
      target = ["production", "preview"]
      key    = "NEO4J_USER"
      value  = var.neo4j_user
    },
    {
      target = ["production", "preview"]
      key    = "NEO4J_URI"
      value  = var.neo4j_uri
    },
    {
      target = ["production", "preview"]
      key    = "NEO4J_PASSWORD"
      value  = var.neo4j_password
    },
  ]
}
