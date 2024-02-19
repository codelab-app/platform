const { withNx } = require('@nx/next')

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

const plugins = [withBundleAnalyzer, withRawCypherFiles]

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  async headers() {
    return [
      {
        // Cache HTML pages and JSON with data from getStaticPages method on CDN for an hour.
        // After the user updates his app and triggers manual Incremental Static Regeneration,
        // the cache will be invalidated only for the nextjs server. The CDN would still serve the old page.
        // This tells the CDN to revalidate the cache after 1 hour and we would display the message to the user
        // that the updates may take up to 1 hour to be visible on your production website.
        headers: [
          {
            key: 'CDN-Cache-Control',
            value:
              'max-age=3600, stale-while-revalidate=14400, stale-if-error=14400',
          },
        ],
        source: '/:path*',
      },
      {
        // Cache static assets on CDN for a year. This will be automatically invalidated on new deployments.
        // This is the same value that Next.js assigns to the Cache-Control header
        headers: [
          {
            key: 'CDN-Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
        source: '/_next/static/:path*',
      },
    ]
  },
  nx: { svgr: true },
}

/*
 * Next.js doesn't work well with LESS so we use CSS instead.
 *
 */
module.exports = (phase, context) => {
  const config = plugins.reduce((acc, fn) => fn(acc), nextConfig)

  return withNx(config)(phase, context)
}
