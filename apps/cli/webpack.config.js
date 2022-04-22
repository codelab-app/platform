// Helper for combining webpack config objects
const { merge } = require('webpack-merge')

module.exports = (config, context) => {
  return merge(config, {
    module: {
      rules: [
        {
          test: /\.(cypher|cyp)$/,
          type: 'asset/source',
        },
      ],
    },
  })
}
