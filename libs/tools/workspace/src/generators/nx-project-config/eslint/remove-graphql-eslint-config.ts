import { type ProjectConfiguration, type Tree, updateJson } from '@nx/devkit'
import type { Linter } from 'eslint'
import { join } from 'path'

export const removeGraphqlEslintConfig = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  console.log('Removing GraphQL lint config...')

  const eslintJsonPath = join(projectConfig.root, '.eslintrc.json')

  const removeGraphqlOverrides = (json: Linter.Config) => {
    if (json.overrides) {
      // Find the index of existing GraphQL config
      const existingConfigIndex = json.overrides.findIndex(
        (override) =>
          JSON.stringify(override.files) === JSON.stringify(['*.graphql']),
      )

      if (existingConfigIndex !== -1) {
        // Remove the GraphQL config
        json.overrides.splice(existingConfigIndex, 1)
      }
    }

    return json
  }

  updateJson(tree, eslintJsonPath, removeGraphqlOverrides)
}
