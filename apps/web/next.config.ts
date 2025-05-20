import type { WithNxOptions } from '@nx/next/plugins/with-nx'
import type { NextConfig } from 'next'
import type webpack from 'webpack'

import bundleAnalyzer from '@next/bundle-analyzer'
import { composePlugins, withNx } from '@nx/next'
import env from 'env-var'
import path from 'path'

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

const nextConfig: WithNxOptions = {
  compiler: {
    styledComponents: true,
  },
  // eslint: { ignoreDuringBuilds: true },
  experimental: {
    /**
     * https://github.com/auth0/nextjs-auth0/issues/1752
     */
    // esmExternals: false,
    // serverSourceMaps: false,
    // forceSwcTransforms: true,
    // outputFileTracingRoot: path.join(__dirname, '../../'),
    // optimizePackageImports: ['@auth0/nextjs-auth0/edge'],
    // https://nextjs.org/docs/messages/import-esm-externals
    // typedRoutes: true,
    // 120s
    // increase timeout for long-running proxy request,
    // e.g. request from admin to seed the db; request to seed database in e2e
    // proxyTimeout: 120_000,
    // staleTimes: {
    //   dynamic: 30,
    //   static: 180,
    // },
    // webpackMemoryOptimizations: true, // ⇠ reduces peak heap
    // webpackBuildWorker: true, // runs webpack in its own worker
    // https://github.com/vercel/turborepo/issues/4832#issuecomment-2629459687
    // turbopack working for dev only not for production
    // Moving this out of experimental seems to cause nx cache to not work
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
  // source‑maps add 200‑400MB
  productionBrowserSourceMaps: false,
  // disable to support uniforms
  // http://github.com/vazco/uniforms/issues/1194
  reactStrictMode: false,

  /**
   * https://nextjs.org/docs/app/building-your-application/routing/middleware#matching-paths
   */
  rewrites: () =>
    Promise.resolve({
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
  typescript: {
    // tsconfigPath: path.join(__dirname, './tsconfig.lib.json'),
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    // ignoreBuildErrors: true,
    tsconfigPath: './tsconfig.lib.json',
  },

  webpack: (
    config: webpack.Configuration,
    { isServer }: { isServer: boolean },
  ) => {
    config.module?.rules?.push({
      issuer: /\\.[jt]sx?$/,
      test: /\\.svg$/i,
      use: ['@svgr/webpack'],
    })

    // Add custom condition names
    // Ensure resolve and conditionNames exist, initializing if necessary
    // config.resolve = config.resolve || {}
    // config.resolve.conditionNames = config.resolve.conditionNames || ['import']

    // Add your custom condition(s)
    // if (!config.resolve.conditionNames.includes('development')) {
    //   config.resolve.conditionNames.unshift('development')
    // }

    // console.log(config.resolve.conditionNames) // Let Next/Webpack handle defaults

    return config
  },
}

export default composePlugins(...plugins)(nextConfig)
