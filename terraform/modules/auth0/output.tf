data "auth0_client" "web_client" {
  client_id = auth0_client.web_client.client_id
}

output "web_client" {
  value       = data.auth0_client.web_client
  description = "Auth0 web client"
}

data "auth0_client" "machine_client" {
  client_id = auth0_client.web_client.client_id
}

output "machine_client" {
  value       = data.auth0_client.machine_client
  description = "Auth0 machine client"
}

data "auth0_tenant" "codelab" {}

output "auth0_web_audience" {
  value = auth0_tenant.codelab.default_audience
}
