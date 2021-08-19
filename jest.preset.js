const nxPreset = require('@nrwl/jest/preset')

module.exports = {
  ...nxPreset,
  setupFiles: [`${__dirname}/jest.setup.js`],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  testTimeout: 300000,
  /**
   * Some NPM modules are written in ES6, and must be transformed with babel. node_modules is ignored by default because there are too many packages to transform, so we only transform the ones we have to.
   */
  // transformIgnorePatterns: ['<rootDir>/node_modules/(?!(d3)/)'],
}
