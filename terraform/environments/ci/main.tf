terraform {
  required_version = "1.7.0"

  required_providers {
    auth0 = {
      source  = "auth0/auth0"
      version = "0.50.2"
    }

    circleci = {
      source  = "mrolla/circleci"
      version = "0.6.1"
    }
  }

  cloud {
    organization = "codelab-app"

    workspaces {
      name = "ci"
    }
  }
}
