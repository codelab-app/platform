const { composePlugins, withNx } = require('@nx/next')
const path = require('path')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE_BUNDLE === 'true',
})

/** Allows importing cypher files */
const withWebpackConfig = (nextConfig = {}) =>
  Object.assign({}, nextConfig, {
    webpack(config, options) {
      /**
       * Cypher import
       */
      config.module.rules = config.module.rules ?? []
      config.module.rules.push({
        test: /\.(cypher|cyp)$/,
        type: 'asset/source',
      })

      config.experiments = { ...config.experiments, topLevelAwait: true }

      /**
       * Wdyr
       *
       * https://github.com/welldone-software/why-did-you-render/issues/84
       */
      const { dev, isServer } = options

      if (dev && !isServer) {
        const originalEntry = config.entry

        config.entry = async () => {
          const entries = await originalEntry()
          const wdrPath = path.resolve(__dirname, './wdyr.js')

          if (entries['main.js'] && !entries['main.js'].includes(wdrPath)) {
            // entries['main.js'].unshift(wdrPath)
          }

          return entries
        }
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  })

const plugins = [withBundleAnalyzer, withWebpackConfig]

/**
 * @type {WithNxOptions}
 */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    instrumentationHook: Boolean(process.env.NEXT_PLATFORM_ENABLE_OTEL),
  },
  nx: { svgr: true },
  rewrites: async () => ({
    beforeFiles: [
      // This prevents CORS issue with frontend sending traces to Jaeger, can't add response headers to
      {
        destination: 'http://127.0.0.1:4318/:path*',
        source: '/api/otel/:path*',
      },
    ],
  }),
  /**
   * https://github.com/vercel/next.js/issues/58817
   */
  transpilePackages: [],
}

module.exports = (phase, context) => {
  const config = plugins.reduce((acc, fn) => fn(acc), nextConfig)

  return withNx(config)(phase, context)
}
