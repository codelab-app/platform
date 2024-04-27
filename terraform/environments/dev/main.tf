terraform {
  required_version = "1.7.0"

  required_providers {
    auth0 = {
      source  = "auth0/auth0"
      version = "1.2.0"
    }
  }

  cloud {
    organization = "codelab-app"

    workspaces {
      name = "dev"
    }
  }
}
