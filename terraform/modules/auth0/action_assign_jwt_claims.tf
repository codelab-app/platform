resource "auth0_action" "assign_jwt_claims" {
  name = "Assign JWT Claims"

  supported_triggers {
    id      = "post-login"
    version = "v3"
  }

  runtime = "node18"
  code    = <<-EOT
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

        const claims = {
          roles,
          neo4j_user_id: appMetadata.neo4j_user_id
        };

        api.idToken.setCustomClaim(namespace, claims);
        api.accessToken.setCustomClaim(namespace, claims);
      }
    };
    EOT
  deploy  = true
}
