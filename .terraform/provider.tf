provider "aws" {
  shared_credentials_file = "$HOME/.aws/credentials"
  profile                 = "default"
  region                  = var.aws_region
}

provider "aws" {
  alias                   = "useast1"
  shared_credentials_file = "$HOME/.aws/credentials"
  profile                 = "default"
  region                  = "us-east-1"
}

terraform {
  required_version        = ">= 0.14"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.35"
    }
  }
}
