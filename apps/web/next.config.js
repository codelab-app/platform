const withNx = require('@nrwl/next/plugins/with-nx')
// const withCSS = require('@zeit/next-css')
// const withLess = require('@zeit/next-less')
// const withSass = require('@zeit/next-sass')
const withAntdLess = require('next-plugin-antd-less')
const withPlugins = require('next-compose-plugins')
const { getThemeVariables } = require('antd/dist/theme')

// eslint-disable-next-line padding-line-between-statements
const isProd = process.env.NODE_ENV === 'production'

// fix: prevents error when .less files are required by node
// if (typeof require !== 'undefined') {
//   require.extensions['.less'] = (file) => null;
// }

// Order matters!
const nextConfig = withPlugins([
  [withNx, {}],
  withAntdLess({
    modifyVars: {
      // '@primary-color': '#04f'
    },
    lessVarsFilePath: './src/styles/App.less',
    lessVarsFilePathAppendToEndOfContent: true,
    // optional https://github.com/webpack-contrib/css-loader#object
    cssLoaderOptions: {},

    // Other Config Here...

    webpack: (config, { isServer }) => {
      if (!isServer) {
        // Unset client-side javascript that only works server-side
        // https://github.com/vercel/next.js/issues/7755#issuecomment-508633125
        config.node = { fs: 'empty', module: 'empty' }
      }

      return config
    },

    // future: {
    //   // if you use webpack5
    //   webpack5: true,
    // },
  }),
])

module.exports = nextConfig
