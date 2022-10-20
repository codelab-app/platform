provider "vercel" {
  # Or omit this for the api_token to be read
  # from the VERCEL_API_TOKEN environment variable
  api_token = var.VERCEL_API_TOKEN
  # "codelab" slug, id is more permanent
  team = "team_8nZqpPb3wnhR3D9nHByQNGbr"
}

module "vercel" {
  source = "./modules/vercel"

  depends_on = [module.auth0]

  VERCEL_API_TOKEN = var.VERCEL_API_TOKEN

  AUTH0_ISSUER_BASE_URL  = var.AUTH0_ISSUER_BASE_URL
  NEXT_PUBLIC_BUILDER_URL = var.NEXT_PUBLIC_BUILDER_URL
  AUTH0_DOMAIN           = var.AUTH0_DOMAIN
  AUTH0_M2M_CLIENT_ID        = var.AUTH0_M2M_CLIENT_ID
  AUTH0_M2M_CLIENT_SECRET    = var.AUTH0_M2M_CLIENT_SECRET
  AUTH0_CYPRESS_PASSWORD = var.AUTH0_CYPRESS_PASSWORD
}


