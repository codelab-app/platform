provider "circleci" {
  api_token    = var.circleci_token
  vcs_type     = "github"
  organization = "codelab-app"
  #  organization = "8e547586-c3f2-4c67-8ebf-2057c32e9e00"
}

locals {
  project_name = "platform"
  organization = "codelab-app"
}

resource "circleci_environment_variable" "NEXT_PUBLIC_PLATFORM_HOST" {
  name         = "NEXT_PUBLIC_PLATFORM_HOST"
  value        = var.next_public_platform_host
  project      = local.project_name
  organization = local.organization
}

resource "circleci_environment_variable" "NEXT_PUBLIC_PLATFORM_API_HOSTNAME" {
  name         = "NEXT_PUBLIC_PLATFORM_API_HOSTNAME"
  value        = var.next_public_platform_api_hostname
  project      = local.project_name
  organization = local.organization
}

resource "circleci_environment_variable" "NEXT_PUBLIC_PLATFORM_API_PORT" {
  name         = "NEXT_PUBLIC_PLATFORM_API_PORT"
  value        = var.next_public_platform_api_port
  project      = local.project_name
  organization = local.organization
}

resource "circleci_environment_variable" "AUTH0_CLIENT_ID" {
  name         = "AUTH0_CLIENT_ID"
  value        = var.auth0_web_client_id
  project      = local.project_name
  organization = local.organization
}

resource "circleci_environment_variable" "AUTH0_CLIENT_SECRET" {
  name         = "AUTH0_CLIENT_SECRET"
  value        = var.auth0_web_client_secret
  project      = local.project_name
  organization = local.organization
}

resource "circleci_environment_variable" "AUTH0_M2M_CLIENT_ID" {
  name         = "AUTH0_M2M_CLIENT_ID"
  value        = var.auth0_m2m_client_id
  project      = local.project_name
  organization = local.organization
}

resource "circleci_environment_variable" "AUTH0_M2M_CLIENT_SECRET" {
  name         = "AUTH0_M2M_CLIENT_SECRET"
  value        = var.auth0_m2m_client_secret
  project      = local.project_name
  organization = local.organization
}

resource "circleci_environment_variable" "AUTH0_CYPRESS_USERNAME" {
  name         = "AUTH0_CYPRESS_USERNAME"
  value        = var.auth0_cypress_username
  project      = local.project_name
  organization = local.organization
}

resource "circleci_environment_variable" "AUTH0_CYPRESS_PASSWORD" {
  name         = "AUTH0_CYPRESS_PASSWORD"
  value        = var.auth0_cypress_password
  project      = local.project_name
  organization = local.organization
}

resource "circleci_environment_variable" "AUTH0_AUDIENCE" {
  name         = "AUTH0_AUDIENCE"
  value        = var.auth0_audience
  project      = local.project_name
  organization = local.organization
}

resource "circleci_environment_variable" "AUTH0_ISSUER_BASE_URL" {
  name         = "AUTH0_ISSUER_BASE_URL"
  value        = var.auth0_issuer_base_url
  project      = local.project_name
  organization = local.organization
}

resource "circleci_environment_variable" "AUTH0_SECRET" {
  name         = "AUTH0_SECRET"
  value        = var.auth0_secret
  project      = local.project_name
  organization = local.organization
}

resource "circleci_environment_variable" "AUTH0_BASE_URL" {
  name         = "AUTH0_BASE_URL"
  value        = var.next_public_platform_host
  project      = local.project_name
  organization = local.organization
}

resource "circleci_environment_variable" "CYPRESS_RECORD_KEY" {
  name         = "CYPRESS_RECORD_KEY"
  value        = var.cypress_record_key
  project      = local.project_name
  organization = local.organization
}

resource "circleci_environment_variable" "SLACK_ACCESS_TOKEN" {
  name         = "SLACK_ACCESS_TOKEN"
  value        = var.slack_access_token
  project      = local.project_name
  organization = local.organization
}

resource "circleci_environment_variable" "SLACK_DEFAULT_CHANNEL" {
  name         = "SLACK_DEFAULT_CHANNEL"
  value        = var.slack_default_channel
  project      = local.project_name
  organization = local.organization
}

resource "circleci_environment_variable" "TERRAFORM_TOKEN" {
  name         = "TERRAFORM_TOKEN"
  value        = var.terraform_token
  project      = local.project_name
  organization = local.organization
}

resource "circleci_environment_variable" "NEXT_PUBLIC_SUPABASE_URL" {
  name         = "NEXT_PUBLIC_SUPABASE_URL"
  value        = var.next_public_supabase_url
  project      = local.project_name
  organization = local.organization
}

resource "circleci_environment_variable" "NEXT_PUBLIC_SUPABASE_KEY" {
  name         = "NEXT_PUBLIC_SUPABASE_KEY"
  value        = var.next_public_supabase_key
  project      = local.project_name
  organization = local.organization
}

resource "circleci_environment_variable" "NX_CLOUD_ACCESS_TOKEN" {
  name         = "NX_CLOUD_ACCESS_TOKEN"
  value        = var.nx_cloud_access_token
  project      = local.project_name
  organization = local.organization
}

resource "circleci_environment_variable" "PLATFORM_API_LOG_LEVEL" {
  name         = "PLATFORM_API_LOG_LEVEL"
  value        = "silent"
  project      = local.project_name
  organization = local.organization
}

resource "circleci_environment_variable" "DOCKERHUB_USERNAME" {
  name         = "DOCKERHUB_USERNAME"
  value        = var.dockerhub_username
  project      = local.project_name
  organization = local.organization
}

resource "circleci_environment_variable" "DOCKERHUB_ACCESS_TOKEN" {
  name         = "DOCKERHUB_ACCESS_TOKEN"
  value        = var.dockerhub_access_token
  project      = local.project_name
  organization = local.organization
}

resource "circleci_environment_variable" "DIGITALOCEAN_ACCESS_TOKEN" {
  name         = "DIGITALOCEAN_ACCESS_TOKEN"
  value        = var.digitalocean_access_token
  project      = local.project_name
  organization = local.organization
}
