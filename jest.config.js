const { getJestProjects } = require('@nrwl/jest')

module.exports = {
  projects: getJestProjects(),
  transformIgnorePatterns: ['^.+\\.js$'],
  testTimeout: 300000,
  // bail: process.env.CI ? true : false,
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
}
