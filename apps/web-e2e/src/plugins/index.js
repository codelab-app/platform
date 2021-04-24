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

const { preprocessTypescript } = require('@nrwl/cypress/plugins/preprocessor')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // Preprocess Typescript file using Nx helper
  on('file:preprocessor', preprocessTypescript(config))

  //Make available some of the env variables that we need, because only ones prefixed with Cypress_ get included
  config.env.HASURA_GRAPHQL_ADMIN_SECRET =
    process.env.HASURA_GRAPHQL_ADMIN_SECRET
  config.env.CODELAB_HASURA_GRAPHQL_ENDPOINT =
    process.env.CODELAB_HASURA_GRAPHQL_ENDPOINT

  return config
}
