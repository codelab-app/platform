resource "auth0_client" "web_client" {
  name = "Codelab Web Client"
  # description         = var.app_description
  app_type        = "regular_web"
  oidc_conformant = true
  callbacks = ["${var.next_public_platform_host}/api/auth/callback"]
  allowed_logout_urls = ["${var.next_public_platform_host}"]
  web_origins = ["${var.next_public_platform_host}"]
  allowed_origins = ["${var.next_public_platform_host}"]
  grant_types = ["authorization_code", "implicit", "password", "refresh_token"]

  cross_origin_auth = true

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

resource "auth0_client_credentials" "web_client_credentials" {
  client_id = auth0_client.web_client.id

  authentication_method = "${terraform.workspace}" == "prod" ? "client_secret_basic" : "none"
  # authentication_method = "client_secret_basic"
}
