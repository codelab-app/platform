const nxPreset = require('@nx/jest/preset').default

const testTimeout = process.env.CI ? 15000 : 20000

const JEST_CONFIG_PATH = `${__dirname}/scripts/jest`

module.exports = {
  ...nxPreset,
  setupFiles: [`${JEST_CONFIG_PATH}/setupFiles.js`],
  // globalSetup: `${JEST_CONFIG_PATH}/globalSetup.js`,
  // globalTeardown: `${JEST_CONFIG_PATH}/globalTeardown.js`
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    `${JEST_CONFIG_PATH}/setupFilesAfterEnv.js`,
  ],
  // reporters: ['default', 'jest-junit'],
  testTimeout,
  /**
   * Some NPM modules are written in ES6, and must be transformed with babel. node_modules is ignored by default because there are too many packages to transform, so we only transform the ones we have to.
   */
  // transformIgnorePatterns: [
  //   '<rootDir>/node_modules/(?!(stringify-object|is-regexp|is-obj|cheerio)/)',
  // ],
  transform: {
    '\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2|cypher|cyp)$':
      'jest-transform-stub',
  },
  /* TODO: Update to latest Jest snapshotFormat
   * By default Nx has kept the older style of Jest Snapshot formats
   * to prevent breaking of any existing tests with snapshots.
   * It's recommend you update to the latest format.
   * You can do this by removing snapshotFormat property
   * and running tests with --update-snapshot flag.
   * Example: "nx affected --targets=test --update-snapshot"
   * More info: https://jestjs.io/docs/upgrading-to-jest29#snapshot-format
   */
  snapshotFormat: { escapeString: true, printBasicPrototype: true },
  /**
   * https://github.com/jestjs/jest/issues/13576#issuecomment-1572682459
   */
  // collectCoverage: true,
  // coverageDirectory: `${process.env.NX_WORKSPACE_ROOT}/coverage/${process.env['NX_TASK_TARGET_PROJECT']}`,
}
