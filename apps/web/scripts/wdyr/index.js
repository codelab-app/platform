const path = require('path')

/** @typedef {Parameters<import('next').NextConfig['webpack']>[1]} WebpackConfigContext */

const injectionSource = path.join(__dirname, 'injection.ts')

/**
 * https://github.com/welldone-software/why-did-you-render/issues/266
 *
 * @param {import('webpack').Configuration} config
 * @param {WebpackConfigContext} context
 */
module.exports = (config, context) => {
  if (context.dev && !context.isServer) {
    const originalEntry = config.entry

    config.entry = async () => {
      const entries = await originalEntry()

      if (
        entries['main-app'] &&
        !entries['main-app'].includes(injectionSource)
      ) {
        entries['main-app'].unshift(injectionSource)
      }

      return entries
    }
  }
}
