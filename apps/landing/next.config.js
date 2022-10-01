const { withNx } = require('@nrwl/next/plugins/with-nx')
const withPlugins = require('next-compose-plugins')
const withLess = require('next-with-less')

/*
 * Next.js doesn't work well with LESS so we use CSS instead.
 *
 */
module.exports = withPlugins(
  [
    [
      withLess,
      {
        lessLoaderOptions: {},
      },
    ],
  ],
  withNx({
    nx: { svgr: true },
  }),
)
