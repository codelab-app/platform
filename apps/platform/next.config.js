const { withNx } = require('@nrwl/next/plugins/with-nx')
const withPlugins = require('next-compose-plugins')
const withLess = require('next-with-less')

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

/*
 * Next.js doesn't work well with LESS so we use CSS instead.
 *
 */
module.exports = withPlugins(
  [
    // This approach requires importing less file into _app.tsx, which creates a large bundle size
    [
      withLess,
      {
        lessLoaderOptions: {},
      },
    ],
    withBundleAnalyzer,
    withRawCypherFiles,
  ],
  withNx({
    // https://github.com/vercel/next.js/issues/9830
    experimental: {
      // appDir: true,
      // css: true,
    },
    nx: { svgr: true },
    // reactStrictMode: false,
  }),
)
