#
# Symlinked under each environments
#

terraform {
  required_version = "~> 1.3.1"

  required_providers {
    auth0 = {
      source  = "auth0/auth0"
      version = ">= 0.37.1"
    }

    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.4"
    }
  }

  cloud {
    organization = "codelab-app"

    # https://www.terraform.io/cli/config/environment-variables#tf_workspace
    #    workspaces {
    #      name = "builder-dev"
    #    }
  }
}

#plugin "terraform" {
#  enabled = true
#  preset  = "recommended"
#}
