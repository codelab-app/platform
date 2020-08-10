/* eslint-disable no-param-reassign */
// const webpack = require('webpack')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const findConfig = require('findup-sync')
// const withFonts = require('next-fonts')
const withPlugins = require('next-compose-plugins')

const esModules = ['@codelab/ui', 'deepdash-es', 'lodash-es']
const withTM = require('next-transpile-modules')(esModules)

const nextConfig = {
  webpack(config, { dev }) {
    if (dev) {
      /**
       * Source maps
       */
      config.devtool = 'cheap-module-source-map'
      config.module.rules.push({
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
        exclude: [/.*node_modules.*/],
      })
    }

    /**
     * Add Plugin
     *
     * https://stackoverflow.com/questions/53266814/next-js-pass-node-env-to-client
     */
    config.plugins = [
      ...(config.plugins || []),

      // Read the .env file
      new Dotenv({
        path: path.resolve(__dirname, findConfig('.env.dev')),
        // systemvars: true
      }),
    ]

    // console.log(util.inspect(config, false, null, true /* enable colors */))
    return config
  },
}

module.exports = withPlugins([withTM], nextConfig)
