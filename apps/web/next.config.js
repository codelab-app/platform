const withNx = require('@nrwl/next/plugins/with-nx')
// const withLess = require('@nrwl/next/plugins/with-less')
const withAntdLess = require('next-plugin-antd-less')
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const withPlugins = require('next-compose-plugins')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
const withLess = require('next-with-less')

// const nodeExternals = require('webpack-node-externals')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/**
 * Webpack 5 causes next-less to break, so we require custom css-loader. Would also cause issue with monaco-editor, which requires ESM loader for Next.js (but has some issues)
 */
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
    // [
    //   withAntdLess,
    //   {
    //     modifyVars: { '@primary-color': '#04f' }, // optional
    //     // lessVarsFilePath: './src/styles/antd-theme.less',
    //     // lessVarsFilePathAppendToEndOfContent: false,
    //     // lessLoaderOptions: {
    //     //   javascriptEnabled: true,
    //     // },
    //   },
    // ],
    // [
    //   withLess,
    //   {
    //     lessLoaderOptions: {},
    //   },
    // ],
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
        // experimental: {
        //   esmExternals: false,
        // },
        cssModules: false,
        webpack5: false,
      },
    ],
  ],
  {
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
  },
)
