resource "auth0_action" "assign_default_role" {
  name = "Assign Default Role"

  supported_triggers {
    id      = "post-login"
    version = "v3"
  }

  runtime = "node16"
  code    = <<-EOT
    /**
      * Handler that will be called during the execution of a PostLogin flow.
      *
      * Social login doesn't trigger postRegistration hook, we so check if it's user's first login here.
      *
      * @param {Event} event - Details about the user and the context in which they are logging in.
      * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
     */
    exports.onExecutePostLogin = async (event, api) => {
      console.log(event)

      const loginsCount = event.stats.logins_count

      if (loginsCount > 1) {
        return
      }

      const ManagementClient = require('auth0@2.27.0').ManagementClient;

      const accessToken = await new ManagementClient({
        grant_type: "client_credentials",
        domain: "${var.auth0_domain}",
        scope: 'update:users',
        clientId: "${auth0_client.machine_client.client_id}",
        clientSecret: "${auth0_client.machine_client.client_secret}"
      }).getAccessToken();

      const client = new ManagementClient({
        domain: "${var.auth0_domain}",
        scope: 'update:users',
        token: accessToken
      })

      await client.assignRolestoUser({
        id: event.user.user_id,
      }, { roles: ["${auth0_role.user_role.id}", "${auth0_role.admin_role.id}"] })
    };

    /**
      * Handler that will be invoked when this action is resuming after an external redirect. If your
      * onExecutePostLogin function does not perform a redirect, this function can be safely ignored.
      *
      * @param {Event} event - Details about the user and the context in which they are logging in.
      * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
      */
    // exports.onContinuePostLogin = async (event, api) => {
    // };
    EOT
  deploy  = true
}
