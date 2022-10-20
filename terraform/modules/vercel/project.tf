#data "auth0_client" "web_client" {
#  name = "Codelab Web Client"
#}

# A project that is connected to a git repository.
# Deployments will be created automatically
# on every branch push and merges onto the Production Branch.
resource "vercel_project" "builder" {
  name      = "builder"
  framework = "nextjs"

#  depends_on = [data.auth0_client.web_client]

  git_repository = {
    type = "github"
    repo = "codelab-app/builder"
  }

  builder_command = "./scripts/vercel/builder/build.sh"
  output_directory = "dist/apps/builder/.next"
  install_command = "./scripts/vercel/builder/install.sh"

  serverless_function_region = "sfo1"

  environment = [
    {
      target = ["production"]
      key = "NEXT_PUBLIC_BUILDER_URL"
      value = var.NEXT_PUBLIC_BUILDER_URL
    },
#    {
#      target = ["production"]
#      key = "AUTH0_AUDIENCE"
#      value = data.auth0_client.web_client.addons.samlp.audience
#    },
  ]
}

