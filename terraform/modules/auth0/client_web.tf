resource "auth0_client" "web_client" {
  name = "Codelab Web Client"
  # description         = var.app_description
  app_type        = "regular_web"
  oidc_conformant = true
  callbacks = [
    "${var.next_public_platform_host}/api/auth/callback",
  "https://*.vercel.app/api/auth/callback"]
  allowed_logout_urls = [
    "${var.next_public_platform_host}",
  "https://*.vercel.app"]
  web_origins = [
    "${var.next_public_platform_host}",
  "https://*.vercel.app"]
  allowed_origins = [
    "${var.next_public_platform_host}",
  "https://*.vercel.app"]
  grant_types                = ["authorization_code", "implicit", "password", "refresh_token"]
  token_endpoint_auth_method = "${terraform.workspace}" == "prod" ? "client_secret_post" : "none"

  jwt_configuration {
    # lifetime_in_seconds = var.jwt_lifetime_in_seconds
    secret_encoded      = true
    lifetime_in_seconds = 2592000
    alg                 = "RS256"
  }

  refresh_token {
    rotation_type   = "non-rotating"
    expiration_type = "expiring"
    # token_lifetime               = var.token_lifetime
    infinite_idle_token_lifetime = false
    infinite_token_lifetime      = false
    # idle_token_lifetime          = var.idle_token_lifetime
  }
}
