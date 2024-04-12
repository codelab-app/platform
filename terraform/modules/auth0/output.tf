output "web_client" {
  value       = auth0_client.web_client
  description = "Auth0 web client"
}

output "machine_client" {
  value       = auth0_client.machine_client
  description = "Auth0 machine client"
}

data "auth0_tenant" "codelab" {}

output "auth0_web_audience" {
  value = auth0_tenant.codelab.default_audience
}
