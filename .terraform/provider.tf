provider "aws" {
  region = var.AWS_REGION
}

module "codelab-vpc" {
  source = "./vpc"
}

module "codelab-rds" {
  source = "./rds"
  RDS_PASSWORD = var.RDS_PASSWORD
}