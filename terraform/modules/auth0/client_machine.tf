resource "auth0_client" "machine_client" {
  name        = "Auth0 Actions"
  description = "A M2M client used by Auth0 Actions Flows"
  app_type    = "non_interactive"
}

# Allow machine client to access the scope of the management API
resource "auth0_client_grant" "machine_client_grant" {
  client_id = auth0_client.machine_client.id
  audience  = "${var.AUTH0_ISSUER_BASE_URL}api/v2/"
  scope     = ["update:users"]
}
