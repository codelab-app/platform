terraform {
  required_version = "~> 1.3.1"

  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.4"
    }

    auth0 = {
      source  = "auth0/auth0"
      version = ">= 0.37.1"
    }
  }
}


