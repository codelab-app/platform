data "auth0_client" "web_client" {
  name = "Codelab Web Client"
}

# A project that is connected to a git repository.
# Deployments will be created automatically
# on every branch push and merges onto the Production Branch.
resource "vercel_project" "builder" {
  name      = "builder"
  framework = "nextjs"
  team_id = var.VERCEL_TEAM_ID

#  depends_on = [data.auth0_client.web_client]

  git_repository = {
    type = "github"
    repo = "codelab-app/builder"
  }

  build_command = "./scripts/vercel/builder/build.sh"
  output_directory = "dist/apps/builder/.next"
  install_command = "./scripts/vercel/builder/install.sh"

  serverless_function_region = "sfo1"

  environment = [
    {
      target = ["production"]
      key = "NEXT_PUBLIC_BUILDER_URL"
      value = var.NEXT_PUBLIC_BUILDER_URL
    },
    # Auth0
    {
      target = ["production"]
      key = "AUTH0_AUDIENCE"
      value = var.AUTH0_AUDIENCE
    },
    {
      target = ["production"]
      key = "AUTH0_ISSUER_BASE_URL"
      value = var.AUTH0_ISSUER_BASE_URL
    },
    {
      target = ["production"]
      key = "AUTH0_CLIENT_SECRET"
      value = data.auth0_client.web_client.client_secret
    },
    {
      target = ["production"]
      key = "AUTH0_CLIENT_ID"
      value = data.auth0_client.web_client.id
    },
    # Neo4j
    {
      target = ["production"]
      key = "NEO4J_USER"
      value = var.NEO4J_USER
    },
    {
      target = ["production"]
      key = "NEO4J_URI"
      value = var.NEO4J_URI
    },
    {
      target = ["production"]
      key = "NEO4J_PASSWORD"
      value = var.NEO4J_PASSWORD
    },
    # Vercel
    {
      target = ["production"]
      key = "VERCEL_API_TOKEN"
      value = var.VERCEL_API_TOKEN
    },
    {
      target = ["production"]
      key = "VERCEL_PROJECT_ID"
      value = vercel_project.builder.id
    },
    {
      target = ["production"]
      key = "VERCEL_TEAM_ID"
      value = var.VERCEL_TEAM_ID
    },
  ]
}

