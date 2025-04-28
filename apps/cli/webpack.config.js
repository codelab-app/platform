const { composePlugins, withNx } = require('@nx/webpack')

const withRawCypherFiles = (config, ctx) => {
  config.module.rules = config.module.rules ?? []
  config.module.rules.push({
    test: /\.(cypher|cyp)$/,
    type: 'asset/source',
  })

  return config
}

// Nx plugins for webpack.
module.exports = composePlugins(
  withNx(),
  withRawCypherFiles,
  (config, { context, options }) => {
    // Ensure resolve and conditionNames are initialized
    // config.resolve = config.resolve || {}

    // Prepend 'development' condition if in development mode
    // Keep existing conditions set by Nx or other plugins
    // config.resolve.conditionNames = ['development']

    return config
  },
)
