/* eslint-disable @typescript-eslint/no-explicit-any */
import bundleAnalyzer from '@next/bundle-analyzer'
import { composePlugins, withNx } from '@nx/next'
// eslint-disable-next-line import/default
import envVar from 'env-var'

const { get } = envVar

const analyzeBundle = get('ANALYZE_BUNDLE').default(0).asBool()

const withBundleAnalyzer = bundleAnalyzer({
  enabled: analyzeBundle,
  // openAnalyzer: false,
})

/** Allows importing cypher files */
// const withWebpackConfig = (nextConfig = {}) =>
//   Object.assign({}, nextConfig, {
//     webpack: (config, options) => {
//       /**
//        * Cypher import
//        */
//       config.module.rules = config.module.rules ?? []
//       config.module.rules.push({
//         test: /\.(cypher|cyp)$/,
//         type: 'asset/source',
//       })

//       /**
//        * Wdyr
//        *
//        * For app router using this
//        *
//        * https://github.com/welldone-software/why-did-you-render/issues/266
//        *
//        * Previous
//        *
//        * https://github.com/welldone-software/why-did-you-render/issues/84
//        */
//       if (process.env.NEXT_WEB_ENABLE_WDYR) {
//         const injectWhyDidYouRender = import(
//           path.resolve(__dirname, './scripts/wdyr')
//         ).then((module) => module.default)

//         void injectWhyDidYouRender.then((inject) => inject(config, options))
//       }

//       /**
//        * Return
//        */
//       if (typeof nextConfig.webpack === 'function') {
//         return nextConfig.webpack(config, options)
//       }

//       return config
//     },
//   })

const plugins = [withNx, withBundleAnalyzer]

// const plugins = [withNx]
const port = get('NEXT_PUBLIC_API_PORT').required().asString()
const url = get('NEXT_PUBLIC_API_HOSTNAME').required().asString()
const baseApiPath = get('NEXT_PUBLIC_BASE_API_PATH').required().asString()
const apiHost = `${url}:${port}${baseApiPath}`

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    turbo: {
      rules: {
        // '*.cypher': {
        //   loader: '',
        //   options: {},
        // },
        // '*.svg': {
        //   as: '*.js',
        //   loaders: ['@svgr/webpack'],
        // },
      },
    },
    // outputFileTracingRoot: path.join(__dirname, '../../'),
    // optimizePackageImports: ['@auth0/nextjs-auth0/edge'],
    // https://nextjs.org/docs/messages/import-esm-externals
    // forceSwcTransforms: true,
    // typedRoutes: true,
    // instrumentationHook: Boolean(process.env.NEXT_WEB_ENABLE_OTEL),
  },
  nx: { svgr: true },
  // https://github.com/ant-design/ant-design-examples/blob/main/examples/with-nextjs-app-router-inline-style/next.config.js
  // productionBrowserSourceMaps: true,
  // disable to support uniforms
  // https://github.com/vazco/uniforms/issues/1194
  reactStrictMode: false,
  /**
   * https://nextjs.org/docs/app/building-your-application/routing/middleware#matching-paths
   */
  rewrites: async () => ({
    afterFiles: [],
    // We only need middleware to set the session
    beforeFiles: [
      {
        destination: `${apiHost}/graphql`,
        source: `${baseApiPath}/graphql`,
      },
      {
        destination: `${apiHost}/:path*`,
        source: `${baseApiPath}/:path*`,
      },
    ],
    fallback: [],
    // beforeFiles: [
    //   // This prevents CORS issue with frontend sending traces to Jaeger, can't add response headers to
    //   {
    //     destination: 'http://127.0.0.1:4318/:path*',
    //     source: '/api/otel/:path*',
    //   },
    // ],
  }),
}

export default composePlugins(...plugins)(nextConfig)
