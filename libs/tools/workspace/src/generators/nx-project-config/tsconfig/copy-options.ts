import type { ProjectConfiguration, Tree } from '@nx/devkit'

import { readJson, updateJson } from '@nx/devkit'

/**
 * Moves compilerOptions from tsconfig.json to tsconfig.lib.json for a project.
 */
export const copyLibTsconfigToTsconfig = (
  tree: Tree,
  project: ProjectConfiguration,
): void => {
  const tsconfigPath = `${project.root}/tsconfig.json`
  const tsconfigLibPath = `${project.root}/tsconfig.lib.json`

  if (!tree.exists(tsconfigPath) || !tree.exists(tsconfigLibPath)) {
    console.warn(
      `Skipping ${project.name}: tsconfig.json or tsconfig.lib.json not found.`,
    )

    return
  }

  const tsconfigJson = readJson(tree, tsconfigPath)
  const compilerOptionsToMove = tsconfigJson.compilerOptions

  if (!compilerOptionsToMove) {
    console.warn(
      `Skipping ${project.name}: No compilerOptions found in tsconfig.json.`,
    )

    return
  }

  // Update tsconfig.lib.json with the compilerOptions
  updateJson(tree, tsconfigLibPath, (json) => {
    json.compilerOptions = { ...json.compilerOptions, ...compilerOptionsToMove }

    return json
  })

  // Remove compilerOptions from tsconfig.json
  updateJson(tree, tsconfigPath, (json) => {
    delete json.compilerOptions

    return json
  })

  console.log(`Moved compilerOptions for project: ${project.name}`)
}
