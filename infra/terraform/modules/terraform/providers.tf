terraform {
  required_providers {
    tfe = {
      version = "~> 0.54.0"
    }
  }
}

provider "tfe" {
  # token    = var.terraform_token
}
