const withNx = require('@nrwl/next/plugins/with-nx')
const withLess = require('@zeit/next-less')
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const withPlugins = require('next-compose-plugins')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')

// const nodeExternals = require('webpack-node-externals')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

//
module.exports = withPlugins(
  [
    [
      withCSS,
      {
        cssLoaderOptions: {
          url: false,
        },
      },
    ],
    [
      withSass,
      {
        lessLoaderOptions: {
          javascriptEnabled: true,
        },
      },
    ],
    withLess,
    withBundleAnalyzer,
  ],
  withNx({
    cssModules: false,
    webpack5: false,
    webpack(config, options) {
      // https://github.com/prettier/prettier/issues/4959#issuecomment-416834237
      config.plugins.push(
        new FilterWarningsPlugin({
          exclude:
            /Critical dependency: the request of a dependency is an expression/,
        }),
      )

      config.module.rules.push({
        type: 'javascript/auto',
        test: /\.mjs$/,
        include: /node_modules/,
      })

      return config
    },
  }),
)
