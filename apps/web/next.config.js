const Dotenv = require('dotenv-webpack')

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      config.node = {
        fs: 'empty',
      }
    }

    // Hardcode for now
    config.plugins.push(new Dotenv({ path: '.env.dev' }))

    return config
  },
}
