const util = require('util')
const withNx = require('@nrwl/next/plugins/with-nx')
const withPlugins = require('next-compose-plugins')
const { patchWebpackConfig } = require('next-global-css')
const path = require('path')

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
    // withNx,
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
       * Add alias for loading GraphQL files
       */
      config.resolve.alias = {
        ...config.resolve.alias,

        /**
         * Alias resolve has issues with @graphql-tool/import
         *
         * https://github.com/ardatan/graphql-tools/issues/1544
         */
        // '@codelab/graphql$': path.resolve(process.cwd(), 'schema.api.graphql'),
        '@codelab/graphql': path.resolve(process.cwd()),
      }

      /**
       * Add GraphQL loader
       *
       * https://www.npmjs.com/package/graphql-tag#webpack-loading-and-preprocessing
       */
      config.module.rules.push({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      })

      /**
       * Use this to patch Global CSS issue https://github.com/vercel/next.js/issues/19936
       */
      return patchWebpackConfig(config, options)
    },
  },
)
