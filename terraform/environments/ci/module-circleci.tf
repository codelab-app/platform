module "circleci" {
  source = "../../modules/circleci"

  next_public_platform_host = var.NEXT_PUBLIC_PLATFORM_HOST

  auth0_issuer_base_url   = var.AUTH0_ISSUER_BASE_URL
  auth0_domain            = var.AUTH0_DOMAIN
  auth0_cypress_username  = var.AUTH0_CYPRESS_USERNAME
  auth0_cypress_password  = var.AUTH0_CYPRESS_PASSWORD
  auth0_secret            = var.AUTH0_SECRET

  auth0_web_client_id     = module.auth0.web_client.id
  auth0_web_client_secret = module.auth0.web_client.client_secret

  circleci_token             = var.CIRCLECI_TOKEN
  cypress_record_key         = var.CYPRESS_RECORD_KEY

  slack_access_token    = var.SLACK_ACCESS_TOKEN
  slack_default_channel = var.SLACK_DEFAULT_CHANNEL
  terraform_token       = var.TERRAFORM_TOKEN

  next_public_supabase_url = var.NEXT_PUBLIC_SUPABASE_URL
  next_public_supabase_key = var.NEXT_PUBLIC_SUPABASE_KEY
}
