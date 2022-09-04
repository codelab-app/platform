const { getJestProjects } = require('@nrwl/jest')

/**
 * Issue with jest 28 due to ES6 import, ignoring transform doesn't work either.
 *
 * Sticking with jest 27
 */
module.exports = {
  projects: getJestProjects(),
  // bail: process.env.CI ? true : false,
}

