const nxPreset = require('@nrwl/jest/preset')

module.exports = {
  ...nxPreset,
  setupFiles: [`${__dirname}/jest.setup.js`],
  setupFilesAfterEnv: [
    // `${__dirname}/.jest/jest.setup.js`,
    '@testing-library/jest-dom',
  ],
  testTimeout: 30000,
  // testPathIgnorePatterns: ['i.spec.ts'],
  // testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  // transform: {
  //   '^.+\\.(ts|js|html)$': 'ts-jest',
  // },
  // resolver: '@nrwl/jest/plugins/resolver',
  // moduleFileExtensions: ['ts', 'js', 'html'],
  // coverageReporters: ['html'],
  /**
   * Some NPM modules are written in ES6, and must be transformed with babel. node_modules is ignored by default because there are too many packages to transform, so we only transform the ones we have to.
   */
  // transformIgnorePatterns: ['<rootDir>/node_modules/(?!(d3)/)'],
}
