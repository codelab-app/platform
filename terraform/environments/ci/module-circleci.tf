module "circleci" {
  source = "../../modules/circleci"

  next_public_builder_host = var.NEXT_PUBLIC_BUILDER_HOST

  auth0_issuer_base_url   = var.AUTH0_ISSUER_BASE_URL
  auth0_domain            = var.AUTH0_DOMAIN
  auth0_m2m_client_id     = var.AUTH0_M2M_CLIENT_ID
  auth0_m2m_client_secret = var.AUTH0_M2M_CLIENT_SECRET
  auth0_cypress_username  = var.AUTH0_CYPRESS_USERNAME
  auth0_cypress_password  = var.AUTH0_CYPRESS_PASSWORD
  auth0_secret            = var.AUTH0_SECRET

  auth0_client_id     = module.auth0.web_client.id
  auth0_client_secret = module.auth0.web_client.client_secret

  circleci_token             = var.CIRCLECI_TOKEN
  cypress_record_key         = var.CYPRESS_RECORD_KEY
  nx_cloud_access_token      = var.NX_CLOUD_ACCESS_TOKEN

  slack_access_token    = var.SLACK_ACCESS_TOKEN
  slack_default_channel = var.SLACK_DEFAULT_CHANNEL
  terraform_token       = var.TERRAFORM_TOKEN
}
