terraform {
  required_version = "1.6.3"

  required_providers {
    auth0 = {
      source  = "auth0/auth0"
      version = "1.0.0"
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
