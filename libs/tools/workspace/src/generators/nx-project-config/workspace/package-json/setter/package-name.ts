import type { PackageJson } from 'type-fest'

import { getPackageNameFromProjectName } from '../../path-alias/path-alias'

/**
 * Sets the name property in a package.json object based on the project name.
 *
 * @param packageJson - The package.json object to modify.
 * @param projectName - The name of the project.
 */
export const setPackageJsonName = (
  packageJson: Partial<PackageJson>,
  projectName: string,
): void => {
  if (!projectName) {
    throw new Error('Project name is required for setting package name')
  }

  const packageName = getPackageNameFromProjectName(projectName)

  packageJson.name = packageName

  console.log(`Set package.json name to: ${packageName}`)
}
