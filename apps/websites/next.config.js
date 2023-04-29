const { withNx } = require('@nx/next')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE_BUNDLE === 'true',
})

/** Allows importing cypher files */
const withRawCypherFiles = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules = config.module.rules ?? []
      config.module.rules.push({
        test: /\.(cypher|cyp)$/,
        type: 'asset/source',
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  })
}

const plugins = [withBundleAnalyzer, withRawCypherFiles]

const nextConfig = {
  // https://github.com/vercel/next.js/issues/9830
  experimental: {
    // appDir: true,
    // css: true,
  },
  nx: { svgr: true },
  // reactStrictMode: false,
}

/*
 * Next.js doesn't work well with LESS so we use CSS instead.
 *
 */
module.exports = (phase, context) => {
  const config = plugins.reduce((acc, fn) => fn(acc), nextConfig)

  return withNx(config)(phase, context)
}
