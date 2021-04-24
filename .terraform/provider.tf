provider "aws" {
  region = var.AWS_REGION
}

terraform {
  required_version = ">= 0.14"
}

module "codelab-vpc" {
  source = "./vpc"
}

module "codelab-iam" {
  source              = "./iam"
  PATH_TO_PRIVATE_KEY = var.PATH_TO_PRIVATE_KEY
  PATH_TO_PUBLIC_KEY  = var.PATH_TO_PUBLIC_KEY
}

module "codelab-rds" {
  source       = "./rds"
  RDS_PASSWORD = var.RDS_PASSWORD
}