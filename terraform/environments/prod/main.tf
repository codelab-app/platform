terraform {
  required_version = "1.5.1"

  required_providers {
    auth0 = {
      source  = "auth0/auth0"
      version = ">= 0.37.1"
    }

    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.14.0"
    }

    aws = {
      source  = "hashicorp/aws"
      version = "5.3.0"
    }
  }

  cloud {
    organization = "codelab-app"

    workspaces {
      name = "prod"
    }
  }
}

provider "vercel" {
  # Or omit this for the api_token to be read
  # from the VERCEL_ACCESS_TOKEN environment variable
  api_token = var.VERCEL_ACCESS_TOKEN
  # "codelab" slug, id is more permanent
  team = var.VERCEL_TEAM_ID
}

# Needed this here when we use import
# provider "aws" {
#   region = "us-east-1"
#   access_key = var.AWS_ACCESS_TOKEN
#   secret_key = var.AWS_SECRET_KEY
# }
