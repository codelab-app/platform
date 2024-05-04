output "web_client" {
  value       = data.auth0_client.web_client
  description = "Auth0 web client"
}

output "machine_client" {
  value       = data.auth0_client.machine_client
  description = "Auth0 machine client"
}

output "auth0_web_audience" {
  value = auth0_tenant.codelab.default_audience
}
