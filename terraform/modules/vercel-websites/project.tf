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
      key    = "NEXT_PUBLIC_PLATFORM_HOST"
      value  = var.next_public_platform_host
    },
    # Auth0
    {
      target = ["production", "preview"]
      key    = "AUTH0_ISSUER_BASE_URL"
      value  = var.auth0_issuer_base_url
    },
    {
      target = ["production", "preview"]
      key    = "AUTH0_SECRET"
      value = var.auth0_secret
    },
    {
      target = ["production", "preview"]
      key    = "AUTH0_CLIENT_SECRET"
      # This isn't working
      # value = data.auth0_client.web_client.client_secret
      value = var.auth0_web_client_secret
    },
    {
      target = ["production", "preview"]
      key    = "AUTH0_CLIENT_ID"
      # This isn't working
      # value = data.auth0_client.web_client.id
      value = var.auth0_web_client_id
    },
    {
      target = ["production", "preview"]
      key    = "AUTH0_AUDIENCE"
      value = "${var.auth0_issuer_base_url}api/v2/"
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
    }
  ]
}

