// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next')

const withRawCypherFiles = (nextConfig = {}) =>
  Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules = config.module.rules ?? []
      config.module.rules.push({
        test: /\.(cypher|cyp)$/,
        type: 'asset/source',
      })

      config.experiments = { ...config.experiments, topLevelAwait: true }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  })

const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
}

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withRawCypherFiles,
]

// module.exports = composePlugins(...plugins)(nextConfig)
module.exports = (phase, context) => {
  const config = plugins.reduce((acc, fn) => fn(acc), nextConfig)

  return withNx(config)(phase, context)
}
