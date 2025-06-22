/* eslint-disable canonical/sort-keys */
import type { PackageJson } from 'type-fest'

import { getProjectReferencePaths } from '../../../../rename-npm-name/path-alias/path-alias'

/**
 * We look at the entire path list from `path-alias.json` and generate the relative exports with regards to the current package name
 */
export const getRelativeExports = (packageName: string) => {
  const packageNames = getProjectReferencePaths()

  const exports = packageNames.filter((name: string) =>
    name.startsWith(packageName),
  )

  console.log('Getting relative exports for', packageName, exports)

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

  return exports.reduce<Record<string, PackageJson.Exports>>(
    (acc, name: string) => {
      /**
       * Create a regex to match the package name exactly, or followed by a slash
       *
       * We can match from @codelab/shared-infra-fetch/server but not @codelab/shared-infra-fetch-server
       */
      const packageRegex = new RegExp(`^${packageName}(?:\\/|$)`)

      // Skip if not an exact match or doesn't have a slash after the package name
      if (!packageRegex.test(name)) {
        return acc
      }

      // Extract the path after the package name (will be empty for exact matches)
      const relativePathRaw =
        name === packageName ? '' : name.substring(packageName.length)

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

      const devPath = targetPath.replace('dist', 'src').replace('.js', '.ts')
      const prodPathJs = targetPath
      const prodPathDts = targetPath.replace('.js', '.d.ts')

      const developmentExport: PackageJson.Exports = {
        types: devPath,
        import: devPath,
        require: devPath,
      }

      const defaultExport: PackageJson.Exports = {
        types: prodPathDts,
        import: prodPathJs,
        require: prodPathJs,
      }

      acc[relativePath] = {
        development: developmentExport,
        default: defaultExport,
      }

      // Return the accumulator
      return acc
    },
    {},
  )
}
