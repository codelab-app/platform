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
      version = ">= 0.37.1"
    }
  }
}


provider "auth0" {
  domain        = var.AUTH0_DOMAIN
  client_id     = var.AUTH0_M2M_CLIENT_ID
  client_secret = var.AUTH0_M2M_CLIENT_SECRET
  debug         = true
}
