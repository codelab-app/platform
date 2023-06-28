import type { ProjectConfiguration, Tree } from '@nx/devkit'
import { updateJson } from '@nx/devkit'

export const updateLibTsconfig = (
  tree: Tree,
  project: ProjectConfiguration,
) => {
  const projectName = project.name

  /**
   * Only update if the lib is a backend project, which we will use default nestjs config for
   */

  if (projectName?.includes('backend')) {
    updateJson(tree, `${project.root}/tsconfig.json`, (json) => {
      json.compilerOptions = {
        forceConsistentCasingInFileNames: true,
        module: 'commonjs',
        noFallthroughCasesInSwitch: true,
        noImplicitOverride: true,
        noImplicitReturns: true,
        noPropertyAccessFromIndexSignature: true,
        strict: true,
      }

      return json
    })

    updateJson(tree, `${project.root}/tsconfig.lib.json`, (json) => {
      json.compilerOptions = {
        declaration: true,
        forceConsistentCasingInFileNames: true,
        noFallthroughCasesInSwitch: true,
        noImplicitAny: true,
        // Keep this
        outDir: json.compilerOptions.outDir,
        strictBindCallApply: true,
        strictNullChecks: true,
        target: 'es2021',
        types: ['node'],
      }

      return json
    })
  }
}
