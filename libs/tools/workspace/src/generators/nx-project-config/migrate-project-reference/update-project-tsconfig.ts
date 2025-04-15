import {
  Tree,
  ProjectConfiguration,
  readJson,
  writeJson,
  joinPathFragments,
  normalizePath,
} from '@nx/devkit'
import { getProjectDependencies } from './get-project-dependencies'

/**
 * Updates the tsconfig.json files for a project to use project references
 */
export const updateProjectTsconfig = async (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  const rootTsconfigPath = joinPathFragments(
    projectConfig.root,
    'tsconfig.json',
  )
  const libTsconfigPath = joinPathFragments(
    projectConfig.root,
    'tsconfig.lib.json',
  )
  const specTsconfigPath = joinPathFragments(
    projectConfig.root,
    'tsconfig.spec.json',
  )

  // Skip if project doesn't have a tsconfig.json
  if (!tree.exists(rootTsconfigPath)) {
    console.log(
      `Project ${projectConfig.name} doesn't have a tsconfig.json file`,
    )
    return
  }

  // Get project dependencies
  const dependencies = await getProjectDependencies(tree, projectConfig)

  // Update the root tsconfig.json
  if (tree.exists(rootTsconfigPath)) {
    const rootTsconfig = readJson(tree, rootTsconfigPath)

    // Clear 'compilerOptions.paths' if it exists
    if (rootTsconfig.compilerOptions?.paths) {
      delete rootTsconfig.compilerOptions.paths
    }

    // Ensure it extends from the root tsconfig.base.json
    rootTsconfig.extends = '../../tsconfig.base.json'

    // Ensure files is empty array
    rootTsconfig.files = []

    // Update references
    rootTsconfig.references = [
      ...dependencies.map((dep) => ({ path: normalizePath(dep) })),
    ]

    // Add references to the project's other tsconfig files
    if (tree.exists(libTsconfigPath)) {
      rootTsconfig.references.push({ path: './tsconfig.lib.json' })
    }

    if (tree.exists(specTsconfigPath)) {
      rootTsconfig.references.push({ path: './tsconfig.spec.json' })
    }

    writeJson(tree, rootTsconfigPath, rootTsconfig)
    console.log(`Updated ${rootTsconfigPath}`)
  }

  // Update tsconfig.lib.json
  if (tree.exists(libTsconfigPath)) {
    const libTsconfig = readJson(tree, libTsconfigPath)

    // Ensure it extends from the root tsconfig.base.json
    libTsconfig.extends = '../../tsconfig.base.json'

    // Ensure compilerOptions exists
    libTsconfig.compilerOptions = libTsconfig.compilerOptions || {}

    // Set outDir to be local to the project
    libTsconfig.compilerOptions.outDir = './out-tsc/lib'

    // Set composite and declaration to true
    libTsconfig.compilerOptions.composite = true
    libTsconfig.compilerOptions.declaration = true

    // Update references to include project dependencies' tsconfig.lib.json files
    libTsconfig.references = dependencies.map((dep) => ({
      path: normalizePath(`${dep}/tsconfig.lib.json`),
    }))

    writeJson(tree, libTsconfigPath, libTsconfig)
    console.log(`Updated ${libTsconfigPath}`)
  }

  // Update tsconfig.spec.json
  if (tree.exists(specTsconfigPath)) {
    const specTsconfig = readJson(tree, specTsconfigPath)

    // Ensure it extends from the root tsconfig.base.json
    specTsconfig.extends = '../../tsconfig.base.json'

    // Ensure compilerOptions exists
    specTsconfig.compilerOptions = specTsconfig.compilerOptions || {}

    // Set outDir to be local to the project
    specTsconfig.compilerOptions.outDir = './out-tsc/spec'

    // Reference only this project's tsconfig.lib.json
    specTsconfig.references = [{ path: './tsconfig.lib.json' }]

    writeJson(tree, specTsconfigPath, specTsconfig)
    console.log(`Updated ${specTsconfigPath}`)
  }
}
