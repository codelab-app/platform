const util = require('util')
const withNx = require('@nrwl/next/plugins/with-nx')
const withPlugins = require('next-compose-plugins')
const { patchWebpackConfig } = require('next-global-css')

const cLog = (obj) => console.log(util.inspect(obj, false, null, true))

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
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
 */
module.exports = withPlugins(
  [
    withNx,
    withRawCypherFiles,
    withBundleAnalyzer,
    [
      {
        /**
         * Issue with importing ESM modules from node_modules, such as monaco-editor
         *
         * Solution: https://github.com/vercel/next.js/issues/30330#issuecomment-952172377
         *
         * Cause: https://github.com/vercel/next.js/issues/30330#issuecomment-952847838
         */
        nx: { svgr: true },
        experimental: {
          esmExternals: false,
        },
        cssModules: false,
      },
    ],
  ],
  {
    webpack(config, options) {
      /**
       * Use this to patch Global CSS issue https://github.com/vercel/next.js/issues/19936
       */
      return patchWebpackConfig(config, options)
    },
  },
)
