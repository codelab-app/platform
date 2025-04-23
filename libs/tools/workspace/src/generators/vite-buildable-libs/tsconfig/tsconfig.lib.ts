/* eslint-disable canonical/sort-keys */
import type { ProjectConfiguration, Tree } from '@nx/devkit'
import type { PackageJson, TsConfigJson } from 'type-fest'

import { updateJson } from '@nx/devkit'

export const updateLibraryTsconfig = (
  tree: Tree,
  project: ProjectConfiguration,
) => {
  const tsconfigLibPath = `${project.root}/tsconfig.lib.json`
  const nxTypingCss = '@nx/react/typings/cssmodule.d.ts'
  const nxTypingImage = '@nx/react/typings/image.d.ts'
  const targetTypings = [nxTypingCss, nxTypingImage]

  // Apply the standardization logic directly
  updateJson(tree, tsconfigLibPath, (json: TsConfigJson) => {
    // 1. Clean up 'files' array
    if (json.files && Array.isArray(json.files)) {
      const originalLength = json.files.length

      json.files = json.files.filter(
        (fileEntry: string) =>
          !fileEntry.endsWith(nxTypingCss) &&
          !fileEntry.endsWith(nxTypingImage),
      )

      if (json.files.length !== originalLength) {
        if (json.files.length === 0) {
          delete json.files
        }
      }
    }

    // 2. Ensure and modify 'compilerOptions.types'
    if (!json.compilerOptions) {
      json.compilerOptions = {}
    }

    // Ensure compilerOptions is an object before accessing types
    if (typeof json.compilerOptions === 'object') {
      if (!json.compilerOptions.types) {
        json.compilerOptions.types = []
      } else if (!Array.isArray(json.compilerOptions.types)) {
        console.warn(
          `Warning: 'compilerOptions.types' in ${tsconfigLibPath} is not an array. Skipping type addition.`,
        )

        // Don't modify further if types is not an array
        return json
      }

      // 3. Add target typings if not present
      for (const typing of targetTypings) {
        if (!json.compilerOptions.types.includes(typing)) {
          json.compilerOptions.types.push(typing)
        }
      }
    }

    return json
  })
}
