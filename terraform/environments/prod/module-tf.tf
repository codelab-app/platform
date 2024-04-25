# module "terraform" {
#   source = "../../modules/terraform"

#   # terraform_token = var.TERRAFORM_TOKEN
# }

# Import needs to be at root, need to sync since we created remote resources first

# Need to explicity set token here even if we login using terraform CLI
# Can also set using `TFE_TOKEN`
provider "tfe" {
  token = var.TERRAFORM_TOKEN
}

resource "tfe_organization" "codelab" {
  name  = "codelab-app"
  email = "webber@codelab.app"
}

import {
  to = tfe_organization.codelab
  id = "codelab-app"
}

resource "tfe_project" "codelab" {
  organization = tfe_organization.codelab.name
  name         = "Codelab"
}

import {
  to = tfe_project.codelab
  id = "prj-VG6aQzTGQumcVwBH"
}

resource "tfe_workspace" "prod" {
  name         = "prod"
  organization = tfe_organization.codelab.name

  working_directory = "environments/prod"
}

import {
  to = tfe_workspace.prod
  id = "ws-NrynjEaFcDqEkh73"
}

# Allows us to update cloud env with provisioned values
resource "tfe_variable" "neo4j_uri" {
  key          = "NEO4J_URI"
  value        = module.codelab_neo4j.neo4j_uri
  category     = "terraform"
  workspace_id = tfe_workspace.prod.id
}
