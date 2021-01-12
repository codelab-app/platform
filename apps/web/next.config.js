const fs = require('fs')
const path = require('path')
const withNx = require('@nrwl/next/plugins/with-nx')
const withCss = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
const withSass = require('@zeit/next-sass')
const lessToJS = require('less-vars-to-js')
const withPlugins = require('next-compose-plugins')

const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, './src/styles/antd-custom.less'),
    'utf8',
  ),
)

/**
 * Decorator fix: https://github.com/vercel/next.js/issues/4707#issuecomment-659231837
 */

const nextConfiguration = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return config
  },
}

module.exports = withPlugins(
  [
    // [withNx, {}],
    // Override default css loader support
    [withCss, {}],
    [withSass, {}],
    [
      withLess,
      {
        lessLoaderOptions: {
          javascriptEnabled: true,
          modifyVars: themeVariables,
        },
      },
    ],
  ],
  nextConfiguration,
)
