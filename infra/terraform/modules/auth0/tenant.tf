resource "auth0_tenant" "codelab" {
  # Required for /oauth/token password login
  default_directory = "Username-Password-Authentication"
}

data "auth0_tenant" "codelab" {}
