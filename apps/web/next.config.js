const withNx = require('@nrwl/next/plugins/with-nx')
const withCSS = require('@zeit/next-css')
const withPlugins = require('next-compose-plugins')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
const ignoreLoader = require('ignore-loader')
const util = require('util')

// const nodeExternals = require('webpack-node-externals')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/**
 * Webpack 5 causes next-less to break, so we require custom css-loader. Would also cause issue with monaco-editor, which requires ESM loader for Next.js (but has some issues)
 */
const log = (obj) => {
  console.log(util.inspect(obj, false, null, true /* enable colors */))
}

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
