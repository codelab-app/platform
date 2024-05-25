/* eslint-disable canonical/sort-keys */
import type { ProjectConfiguration, Tree } from '@nx/devkit'
import { updateJson } from '@nx/devkit'

export const updateLibraryTsconfig = (
  tree: Tree,
  project: ProjectConfiguration,
) => {
  const projectName = project.name

  /**
   * Only update if the lib is a backend project, which we will use default nestjs config for
   */

  if (projectName?.startsWith('backend')) {
    updateJson(tree, `${project.root}/tsconfig.json`, (json) => {
      json.compilerOptions = {
        module: 'commonjs',
        forceConsistentCasingInFileNames: true,
        strict: true,
        noImplicitOverride: true,
        noPropertyAccessFromIndexSignature: true,
        noImplicitReturns: true,
        noFallthroughCasesInSwitch: true,
      }

      return json
    })

    updateJson(tree, `${project.root}/tsconfig.lib.json`, (json) => {
      json.compilerOptions = {
        outDir: json.compilerOptions.outDir,
        declaration: true,
        types: ['node'],
        target: 'es2021',
        strictNullChecks: true,
        noImplicitAny: true,
        strictBindCallApply: true,
        forceConsistentCasingInFileNames: true,
        noFallthroughCasesInSwitch: true,
      }

      return json
    })
  }
}
