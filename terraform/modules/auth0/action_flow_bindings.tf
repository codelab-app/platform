resource "auth0_trigger_binding" "login_flow" {
  count = "${terraform.workspace}" == "prod" ? 1 : 0

  trigger = "post-login"

  # Only needed for production
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

resource "auth0_trigger_binding" "login_flow_test" {
  count = "${terraform.workspace}" != "prod" ? 1 : 0

  trigger = "post-login"

  actions {
    id           = auth0_action.assign_default_role.id
    display_name = auth0_action.assign_default_role.name
  }

  actions {
    id           = auth0_action.assign_jwt_claims.id
    display_name = auth0_action.assign_jwt_claims.name
  }
}
