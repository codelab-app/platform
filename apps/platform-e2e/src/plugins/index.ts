// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

import { Env, ENV_VARS } from '@codelab/shared/config'
import { encrypt } from '../support/nextjs-auth0/utils/encrypt'

// import installLogsPrinter from 'cypress-terminal-report/src/installLogsPrinter'

/* eslint-disable @typescript-eslint/no-var-requires */
// const encrypt = require('cypress-nextjs-auth0/encrypt')

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const test = async () => {
  console.log('event test')

  // const User = await Repository.instance.User

  return true
}

const pluginConfig = async (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
) => {
  // installLogsPrinter(on, {
  //   printLogsToConsole: 'always',
  //   collectTestLogs: () => console.log('a'),
  //   includeSuccessfulHookLogs: false,
  // })
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  /**
   * Difficult to get this working so we can properly import using project references, instead we opt for relative to bypass this issue
   */
  on('task', { encrypt })

  config.env.tsConfig = 'tsconfig.json'

  // Remap some of the .env values, because cypress-nextjs-auth0/encrypt requires them to be with other names
  config.env.auth0Audience = Env.auth0.audience
  config.env.auth0Domain = Env.auth0.issuerBaseUrl
  config.env.auth0ClientId = Env.auth0.clientId
  config.env.auth0ClientSecret = Env.auth0.clientSecret
  config.env.auth0CookieSecret = Env.auth0.secret
  config.env.auth0Scope = 'openid profile email'
  config.env.auth0SessionCookieName = 'appSession'
  config.env.auth0LogoutUrl = '/api/auth/logout'
  config.env.auth0ReturnToUrl = '/'
  // This is the Auth0 Management API url
  config.env.auth0Username = Env.auth0.cypressUsername
  config.env.auth0Password = Env.auth0.cypressPassword

  return config
}

export default pluginConfig
