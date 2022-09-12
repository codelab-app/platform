const util = require('util')
const withNx = require('@nrwl/next/plugins/with-nx')
const withPlugins = require('next-compose-plugins')
const withLess = require('next-with-less')

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
 */
module.exports = withPlugins(
  [
    // withTM,
    [
      withLess,
      {
        lessLoaderOptions: {},
      },
    ],
    // withBundleAnalyzer,
    withRawCypherFiles,
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
        cssModules: false,
        // Landing page is handled by a separate nx app
        redirects: async () => [
          // {
          //   source: '/',
          //   destination: '/apps',
          //   permanent: true,
          // },
        ],
      },
    ],
  ],
  // {
  //   webpack: (config, options) => patchWebpackConfig(config, options),
  // },
)
