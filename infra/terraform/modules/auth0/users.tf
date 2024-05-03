resource "auth0_user" "cypress_user" {
  connection_name = "Username-Password-Authentication"
  email           = var.auth0_cypress_username
  password        = var.auth0_cypress_password

  # Until we remove the ability to operate changes on
  # the roles field it is important to have this
  # block in the config, to avoid diffing issues.
  lifecycle {
    ignore_changes = [app_metadata]
  }
}

resource "auth0_user_roles" "user_roles" {
  user_id = auth0_user.cypress_user.id
  roles   = [auth0_role.admin.id, auth0_role.user.id]
}
