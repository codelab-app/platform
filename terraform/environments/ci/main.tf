terraform {
  required_version = "1.6.3"

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
