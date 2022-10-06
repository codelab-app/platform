resource "auth0_user" "user" {
  connection_name = "Username-Password-Authentication"
  email           = "cypress@codelab.app"
  password        = var.auth0_cypress_password
  roles           = [auth0_role.user_role.id]
}
