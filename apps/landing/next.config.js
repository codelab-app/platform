const withNx = require('@nrwl/next/plugins/with-nx')
const withPlugins = require('next-compose-plugins')
const withLess = require('next-with-less')

/*
 * Next.js doesn't work well with LESS so we use CSS instead.
 *
 * Issue with monaco editor https://www.swyx.io/how-to-add-monaco-editor-to-a-next-js-app-ha3
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
        // Disabled if using babel
        // compiler: {
        //   styledComponents: true,
        // },
        experimental: {
          esmExternals: false,
        },
        cssModules: true,
        // Landing page is handled by a separate nx app
        // redirects: async () => [
        //   {
        //     source: '/',
        //     destination: '/apps',
        //     permanent: true,
        //   },
        // ],
      },
    ],
  ],
  // {
  //   webpack: (config, options) => patchWebpackConfig(config, options),
  // },
)
