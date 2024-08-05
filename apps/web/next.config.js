const { composePlugins, withNx } = require('@nx/next')
const path = require('path')
const { get } = require('env-var')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE_BUNDLE === 'true',
})

/** Allows importing cypher files */
const withWebpackConfig = (nextConfig = {}) =>
  Object.assign({}, nextConfig, {
    webpack(config, options) {
      /**
       * Cypher import
       */
      config.module.rules = config.module.rules ?? []
      config.module.rules.push({
        test: /\.(cypher|cyp)$/,
        type: 'asset/source',
      })

      // config.experiments = { ...config.experiments, topLevelAwait: true }

      /**
       * Wdyr
       *
       * https://github.com/welldone-software/why-did-you-render/issues/84
       */
      // if (process.env.NEXT_WEB_ENABLE_WDYR) {
      //   const { dev, isServer } = options

      //   if (dev && !isServer) {
      //     const originalEntry = config.entry

      //     config.entry = async () => {
      //       const entries = await originalEntry()
      //       const wdrPath = path.resolve(__dirname, './wdyr.js')

      //       if (entries['main.js'] && !entries['main.js'].includes(wdrPath)) {
      //         entries['main.js'].unshift(wdrPath)
      //       }

      //       return entries
      //     }
      //   }
      // }

      /**
       * Return
       */
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  })

const plugins = [withNx, withWebpackConfig, withBundleAnalyzer]
const port = get('NEXT_PUBLIC_API_PORT').required().asString()
const url = get('NEXT_PUBLIC_API_HOSTNAME').required().asString()
const baseApiPath = get('NEXT_PUBLIC_BASE_API_PATH').required().asString()
const apiHost = `${url}:${port}/${baseApiPath}`

/**
 * @type {WithNxOptions}
 */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    // https://nextjs.org/docs/messages/import-esm-externals
    esmExternals: 'loose',
    // forceSwcTransforms: true,
    // typedRoutes: true,
    // instrumentationHook: Boolean(process.env.NEXT_WEB_ENABLE_OTEL),
  },
  nx: { svgr: true },
  // disable to support uniforms.
  // https://github.com/vazco/uniforms/issues/1194
  reactStrictMode: false,
  rewrites: async () => ({
    afterFiles: [
      {
        destination: `${apiHost}/:path*`,
        source: `${baseApiPath}/:path*`,
      },
    ],
    // beforeFiles: [
    //   // This prevents CORS issue with frontend sending traces to Jaeger, can't add response headers to
    //   {
    //     destination: 'http://127.0.0.1:4318/:path*',
    //     source: '/api/otel/:path*',
    //   },
    // ],
  }),
}

module.exports = composePlugins(...plugins)(nextConfig)
