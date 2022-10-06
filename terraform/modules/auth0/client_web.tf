resource "auth0_client" "web_client" {
  name = "Codelab Web Client"
  # description         = var.app_description
  app_type            = "regular_web"
  oidc_conformant     = true
  callbacks           = ["${var.codelab_domain_url}/api/auth/callback"]
  allowed_logout_urls = [var.codelab_domain_url]
  allowed_origins     = [var.codelab_domain_url]
  grant_types         = ["authorization_code", "implicit", "password", "refresh_token", "client_credentials"]
  web_origins         = [var.codelab_domain_url]

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
