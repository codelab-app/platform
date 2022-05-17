const { getJestProjects } = require('@nrwl/jest')

module.exports = {
  projects: getJestProjects(),
  // bail: process.env.CI ? true : false,
}

