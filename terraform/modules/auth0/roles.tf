resource "auth0_role" "user_role" {
  name        = "User"
  description = "User privileges"
}

resource "auth0_role" "admin_role" {
  name        = "Admin"
  description = "Admin privileges"
}
