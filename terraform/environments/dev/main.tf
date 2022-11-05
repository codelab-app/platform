terraform {
  required_version = "~> 1.3.1"

  required_providers {
    auth0 = {
      source  = "auth0/auth0"
      version = ">= 0.37.1"
    }
  }

  cloud {
    organization = "codelab-app"

    workspaces {
      name = "dev"
    }
  }
}
