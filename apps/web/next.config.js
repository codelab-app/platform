const withNx = require('@nrwl/next/plugins/with-nx')
const withLess = require('@zeit/next-less')
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')

module.exports = withLess({
  ...withNx({
    cssModules: false,
    webpack5: false,
  }),
  ...withSass({
    lessLoaderOptions: {
      javascriptEnabled: true,
    },
    ...withCSS({
      cssLoaderOptions: {
        url: false,
      },
    }),
  }),
  webpack(config, { isServer }) {
    if (!isServer) {
      // Unset client-side javascript that only works server-side
      // https://github.com/vercel/next.js/issues/7755#issuecomment-508633125
      config.node = { fs: 'empty', module: 'empty' }
    }

    return config
  },
})
