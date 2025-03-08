import bundleAnalyzer from '@next/bundle-analyzer'
import { composePlugins, withNx } from '@nx/next'
import { withSentryConfig } from '@sentry/nextjs'
// eslint-disable-next-line import/default
import env from 'env-var'

const { get } = env

const analyzeBundle = get('ANALYZE_BUNDLE').default(0).asBool()

const withBundleAnalyzer = bundleAnalyzer({
  enabled: analyzeBundle,
  // openAnalyzer: false,
})

const enableInstrumentation = get('NEXT_WEB_ENABLE_OTEL').default(0).asBool()

const sentryConfig = (nextConfig) =>
  withSentryConfig(nextConfig, {
    autoInstrumentMiddleware: false,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: false,

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options
    org: 'codelab-ozc',

    project: 'javascript-nextjs',

    // Automatically annotate React components to show their full name in breadcrumbs and session replay
    reactComponentAnnotation: {
      enabled: true,
    },

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    telemetry: process.env.CI ? false : true,

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: '/monitoring',

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,
  })

const plugins = enableInstrumentation
  ? [withNx, withBundleAnalyzer, sentryConfig]
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
  experimental: {
    // forceSwcTransforms: true,

    // outputFileTracingRoot: path.join(__dirname, '../../'),
    // optimizePackageImports: ['@auth0/nextjs-auth0/edge'],
    // https://nextjs.org/docs/messages/import-esm-externals
    // typedRoutes: true,
    // instrumentationHook: enableInstrumentation,

    // 120s
    // increase timeout for long-running proxy request,
    // e.g. request from admin to seed the db; request to seed database in e2e
    proxyTimeout: 120_000,
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
