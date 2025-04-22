import {
  getPathAliasPackageNames,
  getProjectReferencePaths,
} from '../../path-alias/path-alias'

/**
 * We look at the entire path list from `path-alias.json` and generate the relative exports with regards to the current package name
 */
export const getRelativeExports = (packageName: string) => {
  const packageNames = getProjectReferencePaths()
  const exports = packageNames.filter((name) => name.startsWith(packageName))

  console.log('Getting relative exports for', packageName, exports)

  // Define the type for the accumulator
  type ExportMap = Record<
    string,
    { default: string; import: string; types: string }
  >

  /**
   * Current package name:
   * '@codelab/frontend-application-app'
   *
   * If we see:
   * '@codelab/frontend-application-app/use-cases/build'
   *
   * Then we want to generate:
   * './src/use-cases/build/index.ts'
   */

  return exports.reduce<ExportMap>((acc, name) => {
    // Calculate the relative path, ensuring it starts with './'
    const relativePathRaw = name.replace(packageName, '')
    // Handle the case where the path is empty (root export)
    const relativePath = relativePathRaw === '' ? '.' : `.${relativePathRaw}`

    // Determine the target path based on the relative path
    // const targetPath =
    //   relativePathRaw === ''
    //     ? './src/index.ts'
    //     : `./src${relativePathRaw}/index.ts`

    const targetPath =
      relativePathRaw === ''
        ? './dist/index.js'
        : `./dist${relativePathRaw}/index.js`

    // Assign the dynamic export structure
    acc[relativePath] = {
      import: targetPath,
      types: targetPath.replace('.js', '.d.ts'),
      // eslint-disable-next-line canonical/sort-keys
      default: targetPath,
    }

    // Return the accumulator
    return acc
  }, {})
}
