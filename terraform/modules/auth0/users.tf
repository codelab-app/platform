resource "auth0_user" "cypress_user" {
  connection_name = "Username-Password-Authentication"
  email           = var.auth0_cypress_username
  password        = var.auth0_cypress_password
}

resource "auth0_user_role" "user_role" {
  user_id = auth0_user.cypress_user.id
  role_id = auth0_role.user_role.id
}

resource "auth0_user_role" "admin_role" {
  user_id = auth0_user.cypress_user.id
  role_id = auth0_role.admin_role.id
}
