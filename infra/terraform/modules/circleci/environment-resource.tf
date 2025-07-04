locals {
  project_name = "platform"
  organization = "codelab-app"
}

resource "circleci_environment_variable" "env_vars" {
  for_each = {
    NEXT_PUBLIC_WEB_HOST         = var.next_public_web_host
    NEXT_PUBLIC_API_HOSTNAME     = var.next_public_api_hostname
    NEXT_PUBLIC_API_PORT         = var.next_public_api_port
    NEXT_PUBLIC_BASE_API_PATH    = var.next_public_base_api_path
    DEBUG                        = var.debug
    AUTH0_CLIENT_ID              = var.auth0_web_client_id
    AUTH0_CLIENT_SECRET          = var.auth0_web_client_secret
    AUTH0_M2M_CLIENT_ID          = var.auth0_m2m_client_id
    AUTH0_M2M_CLIENT_SECRET      = var.auth0_m2m_client_secret
    AUTH0_E2E_USERNAME           = var.auth0_e2e_username
    AUTH0_E2E_PASSWORD           = var.auth0_e2e_password
    AUTH0_DOMAIN                 = var.auth0_domain
    AUTH0_SECRET                 = var.auth0_secret
    SLACK_ACCESS_TOKEN           = var.slack_access_token
    SLACK_DEFAULT_CHANNEL        = var.slack_default_channel
    TERRAFORM_USER_TOKEN         = var.terraform_user_token
    TERRAFORM_ORGANIZATION_TOKEN = var.terraform_organization_token
    NEXT_PUBLIC_SUPABASE_URL     = var.next_public_supabase_url
    NEXT_PUBLIC_SUPABASE_KEY     = var.next_public_supabase_key
    NX_CLOUD_ACCESS_TOKEN        = var.nx_cloud_access_token
    API_LOG_LEVEL                = var.api_log_level
    DEBUG                        = var.debug
    DOCKERHUB_USERNAME           = var.dockerhub_username
    DOCKERHUB_ACCESS_TOKEN       = var.dockerhub_access_token
    DIGITALOCEAN_ACCESS_TOKEN    = var.digitalocean_access_token
    DIGITALOCEAN_API_TOKEN       = var.digitalocean_api_token
    DIGITALOCEAN_DROPLET_NAME    = var.digitalocean_droplet_name
    DOCKER_TAG_VERSION           = var.docker_tag_version
    SENTRY_AUTH_TOKEN            = var.sentry_auth_token
  }

  name         = each.key
  value        = each.value
  project      = local.project_name
  organization = local.organization
}

