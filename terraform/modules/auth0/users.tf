resource "auth0_user" "user" {
  connection_name = "Username-Password-Authentication"
  email           = var.auth0_cypress_username
  password        = var.auth0_cypress_password
  roles           = [auth0_role.user_role.id, auth0_role.admin_role.id]
}
