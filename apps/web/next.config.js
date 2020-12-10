/**
 * Decorator fix: https://github.com/vercel/next.js/issues/4707#issuecomment-659231837
 */
const withNx = require('@nrwl/next/plugins/with-nx')

module.exports = withNx({
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   if (!isServer) {
  //     config.node = {
  //       fs: 'empty',
  //     }
  //   }
  //   // const path = findConfig('.env')
  //   // if (path) {
  //   //   config.plugins.push(new Dotenv({ path }))
  //   // }
  //   return config
  // },
})

// const Dotenv = require('dotenv-webpack')
// const findConfig = require('findup-sync')

// module.exports = {
//   webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
//     if (!isServer) {
//       config.node = {
//         fs: 'empty',
//       }
//     }

//     const path = findConfig('.env')

//     if (path) {
//       config.plugins.push(new Dotenv({ path }))
//     }

//     return config
//   },
// }
