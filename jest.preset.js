const nxPreset = require('@nrwl/jest/preset')

const testTimeout = process.env.CI ? 30000 : 300000

module.exports = {
  ...nxPreset,
  setupFiles: [`${__dirname}/jest/setupFiles.ts`],
  globalSetup: `${__dirname}/jest/globalSetup.ts`,
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    `${__dirname}/jest/setupFilesAfterEnv.ts`,
  ],
  testTimeout,
  /**
   * Some NPM modules are written in ES6, and must be transformed with babel. node_modules is ignored by default because there are too many packages to transform, so we only transform the ones we have to.
   */
  // transformIgnorePatterns: ['<rootDir>/node_modules/(?!(d3)/)'],
}
