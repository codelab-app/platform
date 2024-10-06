import bundleAnalyzer from '@next/bundle-analyzer'
import { composePlugins, withNx } from '@nx/next'
import { withSentryConfig } from '@sentry/nextjs'
// eslint-disable-next-line import/default
import envVar from 'env-var'

const { get } = envVar

const analyzeBundle = get('ANALYZE_BUNDLE').default(0).asBool()

const withBundleAnalyzer = bundleAnalyzer({
  enabled: analyzeBundle,
  // openAnalyzer: false,
})

const sentryConfig = (nextConfig) =>
  withSentryConfig(nextConfig, {
    // autoInstrumentMiddleware: false,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

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

const plugins = [withNx, withBundleAnalyzer, sentryConfig]

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
