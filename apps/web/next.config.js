const withNx = require('@nrwl/next/plugins/with-nx')
const withCSS = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
const withSass = require('@zeit/next-sass')
const withPlugins = require('next-compose-plugins')

const isProd = process.env.NODE_ENV === 'production'

// fix: prevents error when .less files are required by node
// if (typeof require !== 'undefined') {
//   require.extensions['.less'] = (file) => null;
// }

// Order matters!
const nextConfig = withPlugins([
  [
    withNx,
    {
      // target: 'serverless',
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
  [withLess, {}],
  [
    withCSS,
    {
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: '[local]___[hash:base64:5]',
      },
    },
  ],
])

module.exports = {}
