import { convertToPackageName } from './package-name'
import pathAliasData from './path-alias.json'

/**
 * While we're migrating the package name, we create test data and expected data first to create the function with AI.
 *
 * Then we run it with our project
 */
describe('convertToNpmPackageName', () => {
  it('should convert path aliases to their expected format', () => {
    // Test each entry in the path-alias.json file
    Object.entries(pathAliasData).forEach(([pathAlias, data]) => {
      const { expected } = data

      expect(convertToPackageName(pathAlias)).toBe(expected)
    })
  })
})
