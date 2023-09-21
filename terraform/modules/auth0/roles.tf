resource "auth0_role" "user" {
  name        = "User"
  description = "User privileges"
}

resource "auth0_role" "admin" {
  name        = "Admin"
  description = "Admin privileges"
}
