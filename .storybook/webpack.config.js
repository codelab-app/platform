const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const tsPaths = new TsconfigPathsPlugin({
  configFile: path.resolve(__dirname, '../tsconfig.base.json'),
})

// Export a function. Accept the base config as the only param.
module.exports = async ({ config }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../'),
  })

  // Found this here: https://github.com/nrwl/nx/issues/2859
  // And copied the part of the solution that made it work
  const svgRuleIndex = config.module.rules.findIndex((rule) => {
    const { test } = rule

    return test.toString().startsWith('/\\.(svg|ico')
  })

  config.module.rules[
    svgRuleIndex
  ].test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/

  config.module.rules.push(
    {
      test: /\.(png|jpe?g|gif|webp)$/,
      loader: require.resolve('url-loader'),
      options: {
        limit: 10000, // 10kB
        name: '[name].[hash:7].[ext]',
      },
    },
    {
      test: /\.svg$/,
      oneOf: [
        // If coming from JS/TS file, then transform into React component using SVGR.
        {
          issuer: {
            test: /\.[jt]sx?$/,
          },
          use: [
            '@svgr/webpack?-svgo,+titleProp,+ref![path]',
            {
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000, // 10kB
                name: '[name].[hash:7].[ext]',
                esModule: false,
              },
            },
          ],
        },
        // Fallback to plain URL loader.
        {
          use: [
            {
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000, // 10kB
                name: '[name].[hash:7].[ext]',
              },
            },
          ],
        },
      ],
    },
  )

  config.resolve.plugins
    ? config.resolve.plugins.push(tsPaths)
    : (config.resolve.plugins = [tsPaths])

  config.resolve.extensions.push('.tsx')
  config.resolve.extensions.push('.ts')

  return config
}
