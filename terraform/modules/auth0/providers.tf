/**
  * Only provider configurations are inherited by child modules, not provider source or version requirements.
  *
  * Each module must declare its own provider requirements. This is especially important for non-HashiCorp providers.
  */
terraform {
  required_version = "~> 1.3.1"

  required_providers {
    auth0 = {
      source  = "auth0/auth0"
      version = ">= 0.34"
    }
  }
}


provider "auth0" {
  domain        = var.auth0_domain
  client_id     = var.auth0_client_id
  client_secret = var.auth0_client_secret
  debug         = true
}
