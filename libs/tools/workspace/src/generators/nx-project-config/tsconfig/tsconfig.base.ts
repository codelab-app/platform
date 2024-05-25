/* eslint-disable canonical/sort-keys */
import type { ProjectConfiguration, Tree } from '@nx/devkit'
import { getWorkspaceLayout, updateJson } from '@nx/devkit'
import merge from 'lodash/merge'
import set from 'lodash/set'
import path from 'path'

/**
 * Wildcard paths drains CPU & battery, so we create paths for import
 */
export const updateBaseTsconfig = (
  tree: Tree,
  project: ProjectConfiguration,
) => {
  const projectName = project.name
  const baseTsconfigPath = path.resolve(tree.root, 'tsconfig.base.json')

  /**
   * Only update if the lib is a backend project, which we will use default nestjs config for
   */

  if (projectName?.startsWith('frontend-application')) {
    const firstLevelDirs = ['graphql', 'services', 'use-cases', 'views']

    updateJson(tree, baseTsconfigPath, (json) => {
      // Map the project reference to the src folder
      const projectReferences = firstLevelDirs.map((dir) => ({
        [`@codelab/${projectName}/dir`]: [`${project.sourceRoot}/dir`],
      }))

      const wildcardProjectReference = `@codelab/${projectName}/*`

      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete json.compilerOptions.paths[wildcardProjectReference]

      json.compilerOptions.paths = merge(
        json.compilerOptions.paths,
        projectReferences,
      )

      return json
    })
  }

  // if (projectName?.startsWith('frontend-domain')) {
  //   const firstLevelDirs = ['services', 'store', 'test', 'views']

  //   updateJson(tree, `${project.root}/tsconfig.json`, (json) => {
  //     json.compilerOptions = {
  //       module: 'commonjs',
  //       forceConsistentCasingInFileNames: true,
  //       strict: true,
  //       noImplicitOverride: true,
  //       noPropertyAccessFromIndexSignature: true,
  //       noImplicitReturns: true,
  //       noFallthroughCasesInSwitch: true,
  //     }

  //     return json
  //   })
  // }
}
