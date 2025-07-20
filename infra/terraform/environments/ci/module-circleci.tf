# CircleCI module for CI environment

module "circleci" {
  source = "../../modules/circleci"

  next_public_web_host      = var.NEXT_PUBLIC_WEB_HOST
  next_public_api_hostname  = var.NEXT_PUBLIC_API_HOSTNAME
  next_public_api_port      = var.NEXT_PUBLIC_API_PORT
  next_public_base_api_path = var.NEXT_PUBLIC_BASE_API_PATH

  debug         = var.DEBUG
  api_log_level = var.API_LOG_LEVEL

  auth0_domain       = var.AUTH0_DOMAIN
  auth0_e2e_username = var.AUTH0_E2E_USERNAME
  auth0_e2e_password = var.AUTH0_E2E_PASSWORD
  auth0_secret       = var.AUTH0_SECRET

  auth0_web_client_id     = module.auth0.web_client.client_id
  auth0_web_client_secret = module.auth0.web_client.client_secret

  auth0_m2m_client_id     = module.auth0.machine_client.client_id
  auth0_m2m_client_secret = module.auth0.machine_client.client_secret

  circleci_token = var.CIRCLECI_TOKEN

  slack_access_token           = var.SLACK_ACCESS_TOKEN
  slack_default_channel        = var.SLACK_DEFAULT_CHANNEL
  terraform_user_token         = var.TERRAFORM_USER_TOKEN
  terraform_organization_token = var.TERRAFORM_ORGANIZATION_TOKEN

  next_public_supabase_url = var.NEXT_PUBLIC_SUPABASE_URL
  next_public_supabase_key = var.NEXT_PUBLIC_SUPABASE_KEY

  nx_cloud_access_token = var.NX_CLOUD_ACCESS_TOKEN
  circleci_api_token    = var.CIRCLECI_TOKEN

  dockerhub_username     = var.DOCKERHUB_USERNAME
  dockerhub_access_token = var.DOCKERHUB_ACCESS_TOKEN

  digitalocean_access_token = var.DIGITALOCEAN_ACCESS_TOKEN
  digitalocean_api_token    = var.DIGITALOCEAN_API_TOKEN
  digitalocean_droplet_name = var.DIGITALOCEAN_DROPLET_NAME
  docker_tag_version        = var.DOCKER_TAG_VERSION

  sentry_auth_token = var.SENTRY_AUTH_TOKEN
}