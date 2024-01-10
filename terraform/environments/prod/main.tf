terraform {
  required_version = "1.6.3"

  required_providers {
    auth0 = {
      source  = "auth0/auth0"
      version = "0.50.2"
    }

    aws = {
      source  = "hashicorp/aws"
      version = "5.25.0"
    }
  }

  cloud {
    organization = "codelab-app"

    workspaces {
      name = "prod"
    }
  }
}
