resource "auth0_action" "upsert_user" {
  name = "Upsert User"

  supported_triggers {
    id      = "post-login"
    version = "v3"
  }

  runtime = "node16"
  code    = <<-EOT

const { request, gql, GraphQLClient } = require('graphql-request')
const { ManagementClient } = require('auth0')

/**
  * Handler that will be called during the execution of a PostLogin flow.
  *
  * Social login doesn't trigger postRegistration hook, we so check if it's user's first login here.
  *
  * @param {Event} event - Details about the user and the context in which they are logging in.
  * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
 */
exports.onExecutePostLogin = async (event, api) => {
  console.log(event.user.user_id)

  const loginsCount = event.stats.logins_count

  // Try catch with create instead
  if (loginsCount > 1) {
    return
  }

  /**
   * Get Access Token
   */
  const accessToken = await new ManagementClient({
    grant_type: "client_credentials",
    // .host includes the port
    domain: new Url('${var.AUTH0_ISSUER_BASE_URL}').hostname,
    scope: 'update:users',
    clientId: '${auth0_client.machine_client.id}',
    clientSecret: '${auth0_client.machine_client.client_secret}'
  }).getAccessToken();

  /**
   * Initialize client
   */
  const url = 'https://${var.NEXT_PUBLIC_BUILDER_HOST}'
  const endpoint = new URL('api/graphql', url)
  // const endpoint = 'https://admin.codelab.app/api/graphql'

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: 'Bearer ' + accessToken,
    },
  })

  /**
   * Create user
   */
  const createUserGql = gql`
    mutation CreateUser($input: [UserCreateInput!]!) {
      createUsers(input: $input) {
        users {
          id
          email
        }
      }
    }
  `
  const variables = {
    input: [
      {
        auth0Id: event.user.user_id,
        email: event.user.email,
        username: event.user.nickname,
        roles: ['${auth0_role.admin_role.name}']
      }
    ]
  }

  try {
    const { createUsers: [user] } = await graphQLClient.request(createUserGql, variables)

    console.log('User created', user)
  } catch (e) {
    console.error('User creation failed', e)
  }

};
    EOT
  deploy  = true
}
