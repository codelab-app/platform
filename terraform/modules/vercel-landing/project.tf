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

  environment = [
    // Mailchimp
    {
      target = ["production", "preview"]
      key = "MAILCHIMP_LIST_ID"
      value = var.mailchimp_list_id
    },
    {
      target = ["production", "preview"]
      key = "MAILCHIMP_API_KEY"
      value = var.mailchimp_api_key
    },
    {
      target = ["production", "preview"]
      key = "MAILCHIMP_SERVER_PREFIX"
      value = var.mailchimp_server_prefix
    },
    // Intercom
    {
      target = ["production", "preview"]
      key = "NEXT_PUBLIC_INTERCOM_APP_ID"
      value = var.next_public_intercom_app_id
    }
  ]
}
