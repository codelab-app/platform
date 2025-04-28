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
module.exports = composePlugins(withNx(), withRawCypherFiles, (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  return config
})
