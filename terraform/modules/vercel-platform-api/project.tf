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
    # Auth0
    {
      target = ["production", "preview"]
      key    = "AUTH0_ISSUER_BASE_URL"
      value  = var.auth0_issuer_base_url
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
    # Vercel
    {
      target = ["production", "preview"]
      key    = "VERCEL_ACCESS_TOKEN"
      value  = var.vercel_access_token
    },
    {
      target = ["production", "preview"]
      key    = "VERCEL_PLATFORM_PROJECT_ID"
      # Cannot have self-referencing ID
      # https://github.com/hashicorp/terraform/issues/3267
      #      value = vercel_project.builder.id
      #      value = data.vercel_project.builder.id
      value = var.vercel_platform_project_id
    },
    {
      target = ["production", "preview"]
      key    = "VERCEL_TEAM_ID"
      value  = var.vercel_team_id
    },
    # Vercel KV
    {
      target = ["production", "preview"]
      key    = "KV_REST_API_URL"
      value  = var.kv_rest_api_url
    },
    {
      target = ["production", "preview"]
      key    = "KV_REST_API_TOKEN"
      value  = var.kv_rest_api_token
    },
  ]
}
