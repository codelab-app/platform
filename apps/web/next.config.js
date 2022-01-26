const util = require('util')
const withNx = require('@nrwl/next/plugins/with-nx')
const withPlugins = require('next-compose-plugins')
const { withGlobalCss, patchWebpackConfig } = require('next-global-css')

const cLog = (obj) => console.log(util.inspect(obj, false, null, true))

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/**
 * Webpack 5 causes next-less to break, so we require custom css-loader. Would also cause issue with monaco-editor, which requires ESM loader for Next.js (but has some issues)
 */
module.exports = withPlugins(
  [
    // withGlobalCss,
    withBundleAnalyzer,
    [
      withNx,
      {
        /**
         * Issue with importing ESM modules from node_modules
         *
         * Solution: https://github.com/vercel/next.js/issues/30330#issuecomment-952172377
         *
         * Cause: https://github.com/vercel/next.js/issues/30330#issuecomment-952847838
         */
        experimental: {
          esmExternals: false,
        },
        // staticPageGenerationTimeout: 150,
        cssModules: false,
      },
    ],
  ],
  {
    webpack(config, options) {
      /**
       * Debugging idea came from here https://github.com/nrwl/nx/issues/5370#issuecomment-847676139
       */

      return patchWebpackConfig(config, options)
      // return config
    },
  },
)
