resource "circleci_context" "prod" {
  name = "prod"
}

resource "circleci_context_environment_variable" "prod" {
  organization = "codelab-app"

  for_each = {
    NEXT_PUBLIC_PLATFORM_HOST         = var.next_public_platform_host
    NEXT_PUBLIC_PLATFORM_API_HOSTNAME = var.next_public_platform_api_hostname
    NEXT_PUBLIC_PLATFORM_API_PORT     = var.next_public_platform_api_port
    AUTH0_CLIENT_ID                   = var.auth0_web_client_id
    AUTH0_CLIENT_SECRET               = var.auth0_web_client_secret
    AUTH0_AUDIENCE                    = var.auth0_audience
    AUTH0_ISSUER_BASE_URL             = var.auth0_issuer_base_url
    AUTH0_SECRET                      = var.auth0_secret
    AUTH0_BASE_URL                    = var.next_public_platform_host
  }

  variable   = each.key
  value      = each.value
  context_id = circleci_context.prod.id
}
