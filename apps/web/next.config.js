const withNx = require('@nrwl/next/plugins/with-nx')
const withLess = require('@zeit/next-less')
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const withPlugins = require('next-compose-plugins')

// const nodeExternals = require('webpack-node-externals')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

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
  withNx({ cssModules: false, webpack5: false }),
)
