const withNx = require('@nrwl/next/plugins/with-nx')
const util = require('util')
const withPlugins = require('next-compose-plugins')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
const withAntdLess = require('next-plugin-antd-less')

// const nodeExternals = require('webpack-node-externals')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const log = (obj) => {
  console.log(util.inspect(obj, false, null, true /* enable colors */))
}

/**
 * Webpack 5 causes next-less to break, so we require custom css-loader. Would also cause issue with monaco-editor, which requires ESM loader for Next.js (but has some issues)
 */
module.exports = withPlugins(
  [
    // [
    //   withAntdLess,
    //   {
    //     lessVarsFilePath: './src/styles/antd-theme.less',
    //   },
    // ],
    withBundleAnalyzer,
  ],
  withNx({
    cssModules: false,
    webpack(config, options) {
      // const isServer = options.isServer
      // console.log({ isServer })

      // // monaco-editor fix
      // // monkey patching, be careful when upgrading next.js
      // const monacoEditorTestRegex = /[\\/]node_modules[\\/]monaco-editor[\\/]/
      // // ignore monaco from error-loader
      // const rules = config.module.rules.find((rule) => rule?.oneOf).oneOf

      // // patch css global error
      // const errorCssGlobal =
      //   'Global CSS \x1B[1mcannot\x1B[22m be imported from files other than your \x1B[1mCustom <App>\x1B[22m. Due to the Global nature of stylesheets, and to avoid conflicts, Please move all first-party global CSS imports to \x1B[36mpages/_app.js\x1B[39m. Or convert the import to Component-Level CSS (CSS Modules).\n' +
      //   'Read more: https://nextjs.org/docs/messages/css-global'

      // const cssGlobalErrorLoaderRule = config.module.rules
      //   .find((rule) => rule?.oneOf)
      //   .oneOf.find(
      //     (rule) =>
      //       rule?.use?.loader === 'error-loader' &&
      //       rule?.use?.options?.reason === errorCssGlobal,
      //   )

      // if (cssGlobalErrorLoaderRule) {
      //   cssGlobalErrorLoaderRule.issuer = {
      //     not: monacoEditorTestRegex,
      //   }
      // }

      // // patch css-npm error
      // const errorCssNpm =
      //   'Global CSS \x1B[1mcannot\x1B[22m be imported from within \x1B[1mnode_modules\x1B[22m.\n' +
      //   'Read more: https://nextjs.org/docs/messages/css-npm'

      // const cssNpmErrorLoaderRule = config.module.rules
      //   .find((rule) => rule?.oneOf)
      //   .oneOf.find(
      //     (rule) =>
      //       rule?.use?.loader === 'error-loader' &&
      //       rule?.use?.options?.reason === errorCssNpm,
      //   )

      // if (cssNpmErrorLoaderRule?.issuer) {
      //   cssNpmErrorLoaderRule.issuer.not = monacoEditorTestRegex
      // }

      // // allow monaco to load css
      // // use this rule instead of the bellow rule, because the bellow one has issuer.not = /node_modules/
      // // this is an exceptional, and intentional case
      // // next.js doesn't want node_modules to import global.css
      // const cssRuleApp = config.module.rules
      //   .find((rule) => rule?.oneOf)
      //   .oneOf.find((rule) => {
      //     // log(rule)
      //     // console.log('----------')

      //     return (
      //       String(rule?.issuer?.and)?.includes('_app') &&
      //       String(rule?.test) === String(/(?<!\.module)\.css$/)
      //     )
      //   })

      // if (cssRuleApp?.issuer?.and) {
      //   cssRuleApp.issuer.or = [
      //     /node_modules\/monaco-editor\/esm/,
      //     ...cssRuleApp.issuer.and,
      //   ]
      //   delete cssRuleApp.issuer.and
      // }

      // // https://nextjs.org/docs/basic-features/built-in-css-support
      // // Since Next.js 9.5.4, importing a CSS file from node_modules is permitted anywhere in your application.
      // // but not from bower...
      // // this supports importing css from bower

      // const cssRuleWeb = config.module.rules
      //   .find((rule) => rule?.oneOf)
      //   .oneOf.find((rule) => {
      //     // log(rule)
      //     // console.log('----------')

      //     return (
      //       String(rule?.issuer?.or)?.includes('/apps/web') &&
      //       String(rule?.test) === String(/(?<!\.module)\.css$/)
      //     )
      //   })

      // if (cssRuleWeb?.include?.and) {
      //   cssRuleWeb.include.or = [/bower_components/, ...cssRuleWeb.include.and]
      //   delete cssRuleWeb.include.and
      // }

      // https://github.com/prettier/prettier/issues/4959#issuecomment-416834237
      config.plugins.push(
        new FilterWarningsPlugin({
          exclude:
            /Critical dependency: the request of a dependency is an expression/,
        }),
      )

      config.module.rules.push({
        type: 'javascript/auto',
        test: /\.mjs$/,
        include: /node_modules/,
      })

      return config
    },
  }),
)
