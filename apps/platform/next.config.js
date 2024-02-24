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
  compiler: {
    styledComponents: true,
  },
  experimental: {
    // instrumentationHook: true,
    // instrumentationHook: process.env.NEXT_PLATFORM_ENABLE_OTEL ? true : false,
  },
  nx: { svgr: true },
  /**
   * https://github.com/vercel/next.js/issues/58817
   */
  transpilePackages: [],
}

module.exports = (phase, context) => {
  const config = plugins.reduce((acc, fn) => fn(acc), nextConfig)

  return withNx(config)(phase, context)
}
