const { getJestProjects } = require('@nrwl/jest')

module.exports = {
  projects: getJestProjects(),
  transformIgnorePatterns: ['^.+\\.js$'],
  // bail: process.env.CI ? true : false,
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
}
