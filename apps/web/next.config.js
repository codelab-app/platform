const fs = require('fs')
const path = require('path')
const withNx = require('@nrwl/next/plugins/with-nx')
const withCss = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
const withSass = require('@zeit/next-sass')
const withPlugins = require('next-compose-plugins')

/**
 * Decorator fix: https://github.com/vercel/next.js/issues/4707#issuecomment-659231837
 */

const nextConfiguration = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // https://github.com/vercel/next.js/blob/canary/examples/with-ant-design-less/next.config.js
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]

      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()

          if (typeof origExternals[0] === 'function') {
            return origExternals[0](context, request, callback)
          }

          return callback()
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }

    return config
  },
}

module.exports = withPlugins(
  [
    // [withNx, {}],
    // Override default css loader support
    [
      withCss,
      {
        // cssModules: true,
        // cssLoaderOptions: {
        //   importLoaders: 1,
        //   localIdentName: '[local]___[hash:base64:5]',
        // },
      },
    ],
    [withSass, {}],
    [
      withLess,
      {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
          additionalData: (content, loaderContext) => {
            loaderContext.addDependency(
              path.resolve(
                process.cwd(),
                'apps/web/src/styles/antd-custom.less',
              ),
            )
            const themeVariables = fs.readFileSync(
              path.resolve(
                process.cwd(),
                'apps/web/src/styles/antd-custom.less',
              ),
              'utf8',
            )

            return content + themeVariables
          },
        },
      },
    ],
  ],
  nextConfiguration,
)
