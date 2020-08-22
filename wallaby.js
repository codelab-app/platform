module.exports = function (wallaby) {
  return {
    autoDetect: true,
    // files: ['libs/**/*.{ts,tsx}'],
    // tests: ['libs/factory/**/*.spec.{ts,tsx}'],
    // compiler: {
    //   // '**/*.ts?(x)': wallaby.compilers.typeScript({
    //   //   module: 'commonjs',
    //   //   jsx: 'React',
    //   // }),
    //   '**/*.ts?(x)': wallaby.compilers.babel({
    //     /* babel options
    //      * like `stage: n` for Babel 5.x or `presets: [...]` for Babel 6
    //      * (no need to duplicate .babelrc, if you have it, it'll be automatically loaded) */
    //     presets: [
    //       '@nrwl/react/babel',
    //       '@babel/preset-env',
    //       '@babel/preset-react',
    //       '@babel/preset-typescript',
    //     ],
    //     plugins: [
    //       [
    //         '@babel/plugin-transform-typescript',
    //         {
    //           allowNamespaces: true,
    //         },
    //       ],
    //       '@babel/plugin-proposal-class-properties',
    //     ],
    //   }),
    // },
  }
}
