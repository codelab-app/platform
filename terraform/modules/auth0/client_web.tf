resource "auth0_client" "web_client" {
  name = "Codelab Web Client"
  # description         = var.app_description
  app_type        = "regular_web"
  oidc_conformant = true
  callbacks = [
    "${local.builder_url}/api/auth/callback",
  "https://*.vercel.app/api/auth/callback"]
  allowed_logout_urls = [
    "${local.builder_url}",
  "https://*.vercel.app"]
  web_origins = [
    "${local.builder_url}",
    "https://*.vercel.app"]
  allowed_origins = [
    "${local.builder_url}",
  "https://*.vercel.app"]
  grant_types = ["authorization_code", "implicit", "password", "refresh_token", "client_credentials"]

  jwt_configuration {
    # lifetime_in_seconds = var.jwt_lifetime_in_seconds
    secret_encoded = true
    alg            = "RS256"
  }

  refresh_token {
    rotation_type   = "rotating"
    expiration_type = "expiring"
    # token_lifetime               = var.token_lifetime
    infinite_idle_token_lifetime = false
    infinite_token_lifetime      = false
    # idle_token_lifetime          = var.idle_token_lifetime
  }
}
