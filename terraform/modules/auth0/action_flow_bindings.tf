resource "auth0_trigger_binding" "login_flow" {
  trigger = "post-login"

  # Only needed for production, but we leave here so the order is correct
  # Will still allow next actions to run even if this fails
  actions {
    id           = auth0_action.upsert_user.id
    display_name = auth0_action.upsert_user.name
  }

  actions {
    id           = auth0_action.assign_default_role.id
    display_name = auth0_action.assign_default_role.name
  }

  actions {
    id           = auth0_action.assign_jwt_claims.id
    display_name = auth0_action.assign_jwt_claims.name
  }
}
