# Manage Consul KV configuration for Auth0
resource "consul_keys" "auth0_config" {
  # Auth0 configuration
  key {
    path  = "config/auth0/domain"
    value = var.auth0_domain
  }
  
  key {
    path  = "config/auth0/m2m_client_id"
    value = var.auth0_m2m_client_id
  }
  
  key {
    path  = "config/auth0/m2m_client_secret"
    value = var.auth0_m2m_client_secret
  }
  
  key {
    path  = "config/auth0/web_client_id"
    value = auth0_client.web_client.client_id
  }
  
  key {
    path  = "config/auth0/web_client_secret"
    value = auth0_client_credentials.web_client_credentials.client_secret
  }
  
  key {
    path  = "config/auth0/secret"
    value = auth0_client_credentials.web_client_credentials.client_secret
  }
}