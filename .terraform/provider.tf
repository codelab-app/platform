provider "aws" {
  region = var.AWS_REGION
}

module "codelab-vpc" {
  source = "./vpc"
}