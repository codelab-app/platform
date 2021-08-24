const withNx = require('@nrwl/next/plugins/with-nx')
const withPlugins = require('next-compose-plugins')
const withAntdLess = require('next-plugin-antd-less')
const path = require('path')
// const nodeExternals = require('webpack-node-externals')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withPlugins(
  [
    [
      withAntdLess,
      {
        lessVarsFilePath: path.resolve(
          process.cwd(),
          'apps/web/src/styles/antd-theme.less',
        ),
      },
    ],
    withBundleAnalyzer,
  ],
  withNx({ cssModules: false }),
)
