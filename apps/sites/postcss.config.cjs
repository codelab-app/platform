// eslint-disable-next-line @typescript-eslint/no-var-requires
const rootPostCssConfig = require('../../postcss.config.cjs')

/**
 * @type {import('postcss').Config}
 */
module.exports = {
  ...rootPostCssConfig,
}
