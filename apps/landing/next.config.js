const { withNx } = require('@nrwl/next/plugins/with-nx')
const withPlugins = require('next-compose-plugins')
const withLess = require('next-with-less')

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
    [
      withLess,
      {
        lessLoaderOptions: {},
      },
    ],
    withoutNodeModulesOnClient,
  ],
  withNx({
    nx: { svgr: true },
  }),
)
