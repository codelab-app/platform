const { withNx } = require('@nrwl/next/plugins/with-nx')
const withPlugins = require('next-compose-plugins')
const withLess = require('next-with-less')
const withAntdLess = require('next-plugin-antd-less')
const path = require('path')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE_BUNDLE === 'true',
})

/** Allows importing cypher files */
const withRawCypherFiles = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules = config.module.rules ?? []
      config.module.rules.push({
        test: /\.(cypher|cyp)$/,
        type: 'asset/source',
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  })
}

// const lessVarsFilePath = path.resolve(
//   './apps/builder/src/styles/antd-variables.less',
// )

/*
 * Next.js doesn't work well with LESS so we use CSS instead.
 *
 */
module.exports = withPlugins(
  [
    // withTM,
    // [
    //   // https://www.npmjs.com/package/next-plugin-antd-less
    //   withAntdLess,
    //   {
    //     // modifyVars: { '@primary-color': '#04f' },
    //     lessVarsFilePath,
    //     lessVarsFilePathAppendToEndOfContent: false,
    //     cssLoaderOptions: {
    //       mode: 'local',
    //       localIdentName:
    //         process.NODE_ENV === 'development'
    //           ? '[local]--[hash:base64:4]'
    //           : '[hash:base64:8]',
    //       exportLocalsConvention: 'camelCase',
    //       exportOnlyLocals: false,
    //       // getLocalIdent: (context, localIdentName, localName, options) => {
    //       //   return 'whatever_random_class_name'
    //       // },
    //     },
    //     nextjs: {
    //       // default false, for easy to debug on PROD mode
    //       localIdentNameFollowDev: true,
    //     },
    //   },
    // ],
    // This approach requires importing less file into _app.tsx, which creates a large bundle size
    [
      withLess,
      {
        lessLoaderOptions: {},
      },
    ],
    withBundleAnalyzer,
    withRawCypherFiles,
  ],
  withNx({
    nx: { svgr: true },
    // https://github.com/vercel/next.js/issues/9830
    // experimental: {
    //   css: true,
    // },
  }),
)
