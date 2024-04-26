resource "auth0_client" "machine_client" {
  name        = "Auth0 Machine Client"
  description = "A M2M client used by Auth0 Actions Flows"
  app_type    = "non_interactive"

  web_origins     = [var.next_public_web_host]
  allowed_origins = [var.next_public_web_host]
}

# Allow machine client to access the scope of the management API
resource "auth0_client_grant" "machine_client_grant" {
  client_id = auth0_client.machine_client.id
  audience  = local.auth0_audience
  scopes    = ["update:users"]
}

data "auth0_client" "machine_client" {
  client_id = auth0_client.machine_client.id
}
