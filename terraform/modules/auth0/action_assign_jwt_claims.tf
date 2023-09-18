resource "auth0_action" "assign_jwt_claims" {
  name = "Assign JWT Claims"

  supported_triggers {
    id      = "post-login"
    version = "v3"
  }

  runtime = "node18-actions"

  dependencies {
    name    = "uuid"
    version = "8.3.2"
  }

  code = <<-EOT
const { v4 } = require('uuid');

/**
  * Handler that will be called during the execution of a PostLogin flow.
  *
  * @param {Event} event - Details about the user and the context in which they are logging in.
  * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
  */
exports.onExecutePostLogin = async (event, api) => {
  if (event.authorization) {
    const namespace = 'https://api.codelab.app/jwt/claims';

    const roles = event?.authorization?.roles ?? [];
    const appMetadata = event?.user?.app_metadata ?? {};
    // Neo4j is source of truth
    const neo4jUserId = appMetadata.neo4j_user_id ?? v4();

    if (!appMetadata.neo4j_user_id) {
      await api.user?.setAppMetadata('neo4j_user_id', neo4jUserId)
    }

    const claims = {
      roles,
      // Auth0 is source of truth for creation data
      neo4j_user_id: neo4jUserId
    };

    api.idToken.setCustomClaim(namespace, claims);
    api.accessToken.setCustomClaim(namespace, claims);
  }
};
    EOT

  deploy = true
}
