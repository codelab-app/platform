import withBundleAnalyzer from '@next/bundle-analyzer'
import { composePlugins, withNx } from '@nx/next'

/** Allows importing cypher files */
const withRawCypherFiles = (nextConfig = {}) =>
  Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules = config.module.rules ?? []
      config.module.rules.push({
        test: /\.(cypher|cyp)$/,
        type: 'asset/source',
      })

      config.experiments = { ...config.experiments, topLevelAwait: true }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  })

const plugins = [
  withBundleAnalyzer({
    enabled: process.env.ANALYZE_BUNDLE === 'true',
  }),
  withRawCypherFiles,
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    esmExternals: 'loose',
    // instrumentationHook: true,
    // instrumentationHook: process.env.NEXT_PLATFORM_ENABLE_OTEL ? true : false,
  },
  nx: { svgr: true },
  serverRuntimeConfig: {
    runtime: 'edge',
  },
}

export default (phase, context) => {
  const config = plugins.reduce((acc, fn) => fn(acc), nextConfig)

  return withNx(config)(phase, context)
}
