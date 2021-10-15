// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

/* eslint-disable @typescript-eslint/no-var-requires */
const encrypt = require('cypress-nextjs-auth0/encrypt')
const webpackPreprocessor = require('@cypress/webpack-preprocessor')

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const pluginConfig: Cypress.PluginConfig = async (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  const options = {
    // send in the options from your webpack.config.js, so it works the same
    // as your app's code
    webpackOptions: require('../../webpack.config'),
    watchOptions: {},
  }

  on('file:preprocessor', webpackPreprocessor(options))
  on('task', { encrypt })

  config.env.tsConfig = 'tsconfig.e2e.json'

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
  config.env.env = process.env.CI ? 'ci' : 'test'

  return config
}

export default pluginConfig
