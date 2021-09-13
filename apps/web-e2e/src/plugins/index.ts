// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// eslint-disable-next-line @typescript-eslint/no-var-requires
const encrypt = require('cypress-nextjs-auth0/encrypt')

const pluginConfig: Cypress.PluginConfig = async (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // Preprocess Typescript file using Nx helper

  on('task', { encrypt })

  // Remap some of the .env values, because cypress-nextjs-auth0/encrypt requires them to be with other names
  config.env.auth0Audience = process.env.AUTH0_AUDIENCE
  config.env.auth0Domain = process.env.AUTH0_ISSUER_BASE_URL
  config.env.auth0ClientId = process.env.AUTH0_CLIENT_ID
  config.env.auth0ClientSecret = process.env.AUTH0_CLIENT_SECRET
  config.env.auth0CookieSecret = process.env.AUTH0_SECRET
  config.env.auth0Scope = 'openid profile email'
  config.env.auth0SessionCookieName = 'appSession'
  config.env.auth0Username = process.env.AUTH0_CYPRESS_USERNAME
  config.env.auth0Password = process.env.AUTH0_CYPRESS_PASSWORD
  config.env.dgraphApiKey = process.env.CODELAB_DGRAPH_API_KEY ?? ''
  config.env.codelabApiEndpoint = process.env.CODELAB_API_ENDPOINT ?? ''

  /**
   * Programmatically get the user since Auth0 actions is too complicated with Cypress
   */
  // const authClient = new AuthenticationClient({
  //   clientId: process.env.AUTH0_CLIENT_ID,
  //   clientSecret: process.env.AUTH0_CLIENT_SECRET,
  //   domain: new URL(`${process.env.AUTH0_ISSUER_BASE_URL}`).hostname,
  // })
  //
  // const { access_token } = await authClient.passwordGrant({
  //   username: config.env.auth0Username,
  //   password: config.env.auth0Password,
  //   audience: `${process.env.AUTH0_AUDIENCE}`,
  //   scope: 'openid email profile',
  // })
  //
  // const profile = await authClient.getProfile(access_token)
  //
  // config.env.profile = profile
  // config.env.accessToken = access_token

  return config
}

export default pluginConfig
