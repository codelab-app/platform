const { getJestProjects } = require('@nrwl/jest')

module.exports = {
  projects: getJestProjects(),
  transformIgnorePatterns: ['^.+\\.js$'],
  testTimeout: 300000
}
