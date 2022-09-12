const withNx = require('@nrwl/next/plugins/with-nx')
const withPlugins = require('next-compose-plugins')
const withLess = require('next-with-less')

/*
 * Next.js doesn't work well with LESS so we use CSS instead.
 *
 */
module.exports = withPlugins(
  [
    [
      withLess,
      {
        lessLoaderOptions: {},
      },
    ],
    // withBundleAnalyzer,
    [
      withNx,
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
      },
    ],
  ],
  // {
  //   webpack: (config, options) => patchWebpackConfig(config, options),
  // },
)
