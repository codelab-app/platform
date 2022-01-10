const withNx = require('@nrwl/next/plugins/with-nx')
const util = require('util')
const withPlugins = require('next-compose-plugins')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
const withAntdLess = require('next-plugin-antd-less')

// const nodeExternals = require('webpack-node-externals')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const log = (obj) => {
  console.log(util.inspect(obj, false, null, true /* enable colors */))
}

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
    cssModules: false,
    webpack(config, options) {
      // // https://github.com/prettier/prettier/issues/4959#issuecomment-416834237
      // config.plugins.push(
      //   new FilterWarningsPlugin({
      //     exclude:
      //       /Critical dependency: the request of a dependency is an expression/,
      //   }),
      // )

      // config.module.rules.push({
      //   type: 'javascript/auto',
      //   test: /\.mjs$/,
      //   include: /node_modules/,
      // })

      // https://github.com/microsoft/monaco-editor/blob/main/docs/integrate-esm.md#option-1-using-the-monaco-editor-loader-plugin
      config.module.rules.push({
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      })
      config.module.rules.push({
        test: /\.ttf$/,
        use: ['file-loader'],
      })

      return config
    },
  },
}

/**
 * Webpack 5 causes next-less to break, so we require custom css-loader. Would also cause issue with monaco-editor, which requires ESM loader for Next.js (but has some issues)
 */
module.exports = withNx(nextConfig)
