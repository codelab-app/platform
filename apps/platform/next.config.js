const { composePlugins, withNx } = require('@nx/next')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE_BUNDLE === 'true',
})

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

const plugins = [withBundleAnalyzer, withRawCypherFiles]

/**
 * @type {WithNxOptions}
 */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    // instrumentationHook: true,
    // instrumentationHook: process.env.NEXT_PLATFORM_ENABLE_OTEL ? true : false,
  },
  nx: { svgr: true },
  /**
   * https://github.com/vercel/next.js/issues/58817
   */
  transpilePackages: [
    'antd',
    '@ant-design/icons',
    '@ant-design/icons-svg',
    'rc-cascader',
    'rc-checkbox',
    'rc-collapse',
    'rc-dialog',
    'rc-drawer',
    'rc-dropdown',
    'rc-field-form',
    'rc-image',
    'rc-input',
    'rc-input-number',
    'rc-mentions',
    'rc-menu',
    'rc-motion',
    'rc-notification',
    'rc-pagination',
    'rc-picker',
    'rc-progress',
    'rc-rate',
    'rc-resize-observer',
    'rc-segmented',
    'rc-select',
    'rc-slider',
    'rc-steps',
    'rc-switch',
    'rc-table',
    'rc-tabs',
    'rc-textarea',
    'rc-tooltip',
    'rc-tree',
    'rc-tree-select',
    'rc-upload',
    'rc-util',
  ],
}

module.exports = (phase, context) => {
  const config = plugins.reduce((acc, fn) => fn(acc), nextConfig)

  return withNx(config)(phase, context)
}
