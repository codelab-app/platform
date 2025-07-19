import bundleAnalyzer from '@next/bundle-analyzer'
import { composePlugins, withNx } from '@nx/next'
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
    // 120s
    // increase timeout for long-running proxy request,
    // e.g. request from admin to seed the db; request to seed database in e2e
    // proxyTimeout: 120_000,
    staleTimes: {
      dynamic: 30,
      static: 180,
    },

    // https://nextjs.org/docs/app/guides/memory-usage#webpack-build-worker
    webpackBuildWorker: true,
    // https://nextjs.org/docs/app/guides/memory-usage#try-experimentalwebpackmemoryoptimizations
    webpackMemoryOptimizations: true,
  },
  nx: { svgr: false },

  // productionBrowserSourceMaps: Boolean(process.env.CI),
  // https://github.com/ant-design/ant-design-examples/blob/main/examples/with-nextjs-app-router-inline-style/next.config.js
  // productionBrowserSourceMaps: true,
  // disable to support uniforms
  // http://github.com/vazco/uniforms/issues/1194
  reactStrictMode: false,

  // https://github.com/vercel/turborepo/issues/4832#issuecomment-2629459687
  // turbopack working for dev only not for production
  turbopack: {
    rules: {
      '*.svg': {
        as: '*.js',
        loaders: ['@svgr/webpack'],
      },
    },
  },

  webpack(config) {
    config.module.rules.push({
      issuer: /\.[jt]sx?$/,
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

export default composePlugins(...plugins)(nextConfig)
