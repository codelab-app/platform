import type { PackageJson } from 'type-fest'

/**
 * Updates the devDependencies field in a package.json object.
 *
 * @param packageJson - The package.json object to modify.
 * @param baseImportPaths - An array of unique base import paths to add as dependencies.
 */
export const setDevDependencies = (
  packageJson: PackageJson,
  baseImportPaths: Array<string>,
): void => {
  // Ensure devDependencies exists
  packageJson.devDependencies = packageJson.devDependencies || {}

  console.log('Updating devDependencies...')

  // Add each unique base import path as a devDependency
  for (const basePath of baseImportPaths) {
    if (!packageJson.devDependencies[basePath]) {
      packageJson.devDependencies[basePath] = 'workspace:*'
      console.log(`Added ${basePath}@workspace:* to devDependencies`)
    } else {
      console.log(`Dependency ${basePath} already exists in devDependencies.`)
    }
  }

  console.log('Finished updating devDependencies.')
}
