import bundleAnalyzer from '@next/bundle-analyzer'
import { composePlugins, withNx } from '@nx/next'
// eslint-disable-next-line import/default
import env from 'env-var'

const { get } = env

const analyzeBundle = get('ANALYZE_BUNDLE').default('false').asBoolStrict()

const withBundleAnalyzer = bundleAnalyzer({
  enabled: analyzeBundle,
  // openAnalyzer: false,
})

const enableInstrumentation = get('NEXT_WEB_ENABLE_OTEL').default(0).asBool()

const plugins = enableInstrumentation
  ? [withNx, withBundleAnalyzer]
  : [withNx, withBundleAnalyzer]

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
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  experimental: {
    // forceSwcTransforms: true,

    // outputFileTracingRoot: path.join(__dirname, '../../'),
    // optimizePackageImports: ['@auth0/nextjs-auth0/edge'],
    // https://nextjs.org/docs/messages/import-esm-externals
    // typedRoutes: true,

    // 120s
    // increase timeout for long-running proxy request,
    // e.g. request from admin to seed the db; request to seed database in e2e
    proxyTimeout: 120_000,
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
    // https://github.com/vercel/turborepo/issues/4832#issuecomment-2629459687
    // turbopack working for dev only not for production
    turbo: {
      rules: {
        '*.svg': {
          as: '*.js',
          loaders: ['@svgr/webpack'],
        },
      },
    },
  },
  nx: { svgr: false },
  // productionBrowserSourceMaps: Boolean(process.env.CI),
  // https://github.com/ant-design/ant-design-examples/blob/main/examples/with-nextjs-app-router-inline-style/next.config.js
  // productionBrowserSourceMaps: true,
  // disable to support uniforms
  // http://github.com/vazco/uniforms/issues/1194
  reactStrictMode: false,
  /**
   * https://nextjs.org/docs/app/building-your-application/routing/middleware#matching-paths
   */
  rewrites: async () => ({
    afterFiles: [],
    // We only need middleware to set the session
    /**
     * https://github.com/vercel/next.js/issues/36251
     */
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
