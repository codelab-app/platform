/**
 * Create a function so future modifications will be easier
 */
const modifyJestConfig = (config) => {
  return {
    ...config,
    transform: {
      ...config?.transform,
      // Replace babel-jest with ts-jest
      // '^.+\\.[tj]sx?$': 'babel-jest',
      '^.+\\.[tj]sx?$': 'ts-jest',
    },
    globals: {
      ...config?.globals,
      'ts-jest': {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        babelConfig: '<rootDir>/.babelrc',
        // https://github.com/kentcdodds/babel-plugin-macros/issues/160
        useESM: true,
      },
    },
  }
}

module.exports.modifyJestConfig = modifyJestConfig
