terraform {
  required_version = "1.5.1"

  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.14.0"
    }

    auth0 = {
      source  = "auth0/auth0"
      version = ">= 0.37.1"
    }
  }
}


