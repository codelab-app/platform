resource "circleci_context" "prod" {
  name = "prod"
}

resource "circleci_context_environment_variable" "prod" {
  organization = "codelab-app"

  for_each = {
    NEXT_PUBLIC_WEB_HOST     = var.next_public_web_host
    NEXT_PUBLIC_API_HOSTNAME = var.next_public_api_hostname
    NEXT_PUBLIC_API_PORT     = var.next_public_api_port
    AUTH0_CLIENT_ID          = var.auth0_web_client_id
    AUTH0_CLIENT_SECRET      = var.auth0_web_client_secret
    AUTH0_DOMAIN             = var.auth0_domain
    AUTH0_SECRET             = var.auth0_secret
    # DOCKER_TAG_VERSION       = var.docker_tag_version
  }

  variable   = each.key
  value      = each.value
  context_id = circleci_context.prod.id
}
