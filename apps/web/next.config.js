const util = require('util')
const withNx = require('@nrwl/next/plugins/with-nx')
const withPlugins = require('next-compose-plugins')
const { patchWebpackConfig } = require('next-global-css')
const path = require('path')
const { merge } = require('lodash')
const withTM = require('next-transpile-modules')([
  // `monaco-editor` isn't published to npm correctly: it includes both CSS
  // imports and non-Node friendly syntax, so it needs to be compiled.
  'monaco-editor',
  '@fancyapps/ui',
])

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
 *
 * Issue with monaco editor https://www.swyx.io/how-to-add-monaco-editor-to-a-next-js-app-ha3
 */
module.exports = withPlugins(
  [
    withNx,
    withTM,
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
        // https://nextjs.org/docs/advanced-features/compiler#styled-components
        // Disabled if using babel
        // compiler: {
        //   styledComponents: true,
        // },
        experimental: {
          esmExternals: false,
        },
        cssModules: true,
      },
    ],
  ],
  {
    webpack(config, options) {
      /**
       * Add alias for loading GraphQL files
       */
      config.resolve.alias = {
        ...config.resolve.alias,
      }

      /**
       * Use this to patch Global CSS issue https://github.com/vercel/next.js/issues/19936
       */
      // return patchWebpackConfig(config, options)
      return config
    },
  },
)
