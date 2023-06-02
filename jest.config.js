const { getJestProjects } = require('@nx/jest')

/**
 * Issue with jest 28 due to ES6 import, ignoring transform doesn't work either.
 *
 * Sticking with jest 27
 *
 * Must use...
 *
 * transform: {
 *     '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
 *   },
 *
 * `babel-jest` doesn't pickup `.babelrc` for some reason
 */
module.exports = {
  projects: getJestProjects(),
  // reporters: ['default', 'jest-junit'],
}
