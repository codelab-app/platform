terraform {
  required_version = ">= 1.13.0"

  required_providers {
    auth0 = {
      source  = "auth0/auth0"
      version = "1.2.0"
    }

    aws = {
      source  = "hashicorp/aws"
      version = "5.25.0"
    }

    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "2.34.1"
    }

    tfe = {
      version = "~> 0.54.0"
    }

    consul = {
      source  = "hashicorp/consul"
      version = "~> 2.20.0"
    }
  }

  cloud {
    organization = "codelab-app"

    workspaces {
      name = "prod"
    }
  }
}
