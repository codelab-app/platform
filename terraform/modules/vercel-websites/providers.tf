terraform {
  required_version = "1.6.3"

  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "0.15.4"
    }

    auth0 = {
      source  = "auth0/auth0"
      version = "0.50.2"
    }
  }
}


