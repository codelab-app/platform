// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

import { getEnv } from '@codelab/shared/config'
import { encrypt } from '@codelab/testing/cypress/nextjs-auth0'

const pluginConfig = async (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
) => {
  /**
   * Difficult to get this working so we can properly import using project references, instead we opt for relative to bypass this issue
   */
  on('task', { encrypt })

  // Remap some of the .env values, because cypress-nextjs-auth0/encrypt requires them to be with other names
  config.env.auth0Audience = getEnv().auth0.audience
  config.env.auth0Domain = getEnv().auth0.issuerBaseUrl
  config.env.auth0ClientId = getEnv().auth0.clientId
  config.env.auth0ClientSecret = getEnv().auth0.clientSecret
  config.env.auth0CookieSecret = getEnv().auth0.secret
  config.env.auth0Scope = 'openid profile email'
  config.env.auth0SessionCookieName = 'appSession'
  config.env.auth0LogoutUrl = '/api/auth/logout'
  config.env.auth0ReturnToUrl = '/'
  // This is the Auth0 Management API url
  config.env.auth0Username = getEnv().auth0.cypressUsername
  config.env.auth0Password = getEnv().auth0.cypressPassword

  return config
}

export default pluginConfig
