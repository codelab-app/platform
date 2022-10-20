resource "auth0_user" "user" {
  connection_name = "Username-Password-Authentication"
  email           = "cypress@codelab.app"
  password        = var.AUTH0_CYPRESS_PASSWORD
  roles           = [auth0_role.user_role.id]
}
