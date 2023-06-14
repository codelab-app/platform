resource "auth0_tenant" "tenant" {
  # Required for /oauth/token password login
  default_directory = "Username-Password-Authentication"
}
