const { composePlugins, withNx } = require('@nx/next')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE_BUNDLE === 'true',
})

/** Allows importing cypher files */
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

const plugins = [withBundleAnalyzer, withRawCypherFiles]

/**
 * @type {WithNxOptions}
 */
const nextConfig = {
  experimental: {
    instrumentationHook: process.env.NEXT_ENABLE_OTEL ?? false,
    // appDir: true,
  },
  nx: { svgr: true },
  rewrites: async () => ({
    // We still want the api/graphql to append headers and other context before redirecting
    // afterFiles: [
    //   {
    //     destination: 'http://localhost:4000/graphql',
    //     source: '/api/graphql',
    //   },
    // ],
  }),
}

/*
 * Next.js doesn't work well with LESS so we use CSS instead.
 *
 */
module.exports = (phase, context) => {
  const config = plugins.reduce((acc, fn) => fn(acc), nextConfig)

  return withNx(config)(phase, context)
}
