const Dotenv = require('dotenv-webpack')
const findConfig = require('findup-sync')

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      config.node = {
        fs: 'empty',
      }
    }

    const path = findConfig('.env')

    if (path) {
      config.plugins.push(new Dotenv({ path }))
    }

    return config
  },
}
