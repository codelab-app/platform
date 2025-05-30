resource "auth0_action" "upsert_user" {
  name = "Upsert User"

  supported_triggers {
    id      = "post-login"
    version = "v3"
  }

  runtime = "node18"
  code    = <<-EOT

const { gql, GraphQLClient } = require('graphql-request')
const { URL } = require('url');
const axios = require('axios');

/**
  * Handler that will be called during the execution of a PostLogin flow.
  *
  * Social login doesn't trigger postRegistration hook, we so check if it's user's first login here.
  *
  * @param {Event} event - Details about the user and the context in which they are logging in.
  * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
 */
exports.onExecutePostLogin = async (event, api) => {
  /**
   * Get Access Token
   */
  const options = {
    method: 'POST',
    url: new URL('oauth/token', '${local.auth0_issuer_base_url}').toString(),
    headers: { 'content-type': 'application/json' },
    data: {
      grant_type: 'client_credentials',
      client_id: '${data.auth0_client.machine_client.id}',
      client_secret: '${data.auth0_client.machine_client.client_secret}',
      audience: '${local.auth0_audience}'
    }
  }

  const { data } = await axios.request(options)

  console.log('data', data)

  /**
   * Initialize client
   */
  const url = '${var.next_public_web_host}'
  const endpoint = new URL('api/v1/graphql', url)

  const graphQLClient = new GraphQLClient(endpoint.toString(), {
    headers: {
      authorization: 'Bearer ' + data.access_token,
    },
  })

  /**
   * Create user
   */
  const createUsersGql = gql`
    mutation CreateUsers($input: [UserCreateInput!]!) {
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
        id: event.user.app_metadata.neo4j_user_id,
        auth0Id: event.user.user_id,
        email: event.user.email,
        username: event.user.nickname,
        roles: ['${auth0_role.admin.name}']
      }
    ]
  }

  try {
    const { createUsers: { users } } = await graphQLClient.request(createUsersGql, variables)

    console.log('User created', users)
  } catch (error) {
    console.error('User creation failed', error)
  }

};
    EOT
  deploy  = true

  dependencies {
    name    = "graphql-request"
    version = "4.1.0"
  }

  dependencies {
    name    = "axios"
    version = "0.24.0"
  }
}
