provider "vercel" {
  # Or omit this for the api_token to be read
  # from the VERCEL_API_TOKEN environment variable
  api_token = var.VERCEL_API_TOKEN
  # "codelab" slug, id is more permanent
  team = var.VERCEL_TEAM_ID
}

module "vercel-builder" {
  source = "./modules/vercel-builder"

  depends_on = [module.auth0]

  NEXT_PUBLIC_BUILDER_URL = var.NEXT_PUBLIC_BUILDER_URL
  NEXT_PUBLIC_LANDING_URL = var.NEXT_PUBLIC_LANDING_URL

  AUTH0_ISSUER_BASE_URL   = var.AUTH0_ISSUER_BASE_URL
  AUTH0_DOMAIN            = var.AUTH0_DOMAIN
  AUTH0_M2M_CLIENT_ID     = var.AUTH0_M2M_CLIENT_ID
  AUTH0_M2M_CLIENT_SECRET = var.AUTH0_M2M_CLIENT_SECRET
  AUTH0_CYPRESS_PASSWORD  = var.AUTH0_CYPRESS_PASSWORD
  AUTH0_AUDIENCE          = var.AUTH0_AUDIENCE
  AUTH0_SECRET = var.AUTH0_SECRET

  auth0_client_id = module.auth0.web_client.id
  auth0_client_secret = module.auth0.web_client.client_secret

  NEO4J_PASSWORD = var.NEO4J_PASSWORD
  NEO4J_URI      = var.NEO4J_URI
  NEO4J_USER     = var.NEO4J_USER

  VERCEL_API_TOKEN          = var.VERCEL_API_TOKEN
  VERCEL_TEAM_ID            = var.VERCEL_TEAM_ID
  VERCEL_BUILDER_PROJECT_ID = var.VERCEL_BUILDER_PROJECT_ID
}

module "vercel-landing" {
  source = "./modules/vercel-landing"

  VERCEL_TEAM_ID            = var.VERCEL_TEAM_ID
}

