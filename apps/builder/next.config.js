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

// We use Babel plugin to transpile JSX inside state expressions at runtime on the client.
// But the plugin has dependency on 'fs' package which can only run on server side.
// So need to skip this dependency for client in order to compile project successfully.
// More info - https://github.com/vercel/next.js/issues/7755
const withoutNodeModulesOnClient = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.isServer) {
        config.resolve.fallback.fs = false
      }

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
    withoutNodeModulesOnClient,
    withBundleAnalyzer,
    withRawCypherFiles,
  ],
  withNx({
    nx: { svgr: true },
    // https://github.com/vercel/next.js/issues/9830
    // experimental: {
    //   css: true,
    // },
  }),
)
