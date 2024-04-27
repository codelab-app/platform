resource "tfe_organization" "codelab" {
  name  = "codelab-app"
  email = "webber@codelab.app"
}

resource "tfe_project" "codelab" {
  organization = tfe_organization.codelab.name
  name         = "Codelab"
}

output "organization_codelab" {
  value = tfe_organization.codelab
}

output "project_codelab" {
  value = tfe_project.codelab
}

# resource "tfe_workspace" "prod" {
#   name         = "prod"
#   organization = tfe_organization.codelab.name
# }

# resource "tfe_variable" "neo4j_uri" {
#   key          = "NEO4J_URI"
#   value        = module.neo4j.neo4j_uri
#   category     = "terraform"
#   workspace_id = tfe_workspace.codelab.id
# }
