import type { Linter } from 'eslint'

import {
  offsetFromRoot,
  type ProjectConfiguration,
  type Tree,
  updateJson,
} from '@nx/devkit'
import { join } from 'path'

/**
 * Output ESLint reporter to tmp library
 */
export const addGraphqlEslintConfig = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  console.log('Adding CI lint config...')

  const eslintJsonPath = join(projectConfig.root, '.eslintrc.json')

  const addGraphqlOverrides = (json: Linter.Config) => {
    const relativeSchemaPath = join(
      offsetFromRoot(projectConfig.root),
      'schema.graphql',
    )

    const graphqlConfig = {
      files: ['*.graphql'],
      rules: {},
      // parserOptions: {
      //   schema: relativeSchemaPath,
      // },
    }

    if (json.overrides) {
      // Find the index of existing GraphQL config
      const existingConfigIndex = json.overrides.findIndex(
        (override) =>
          JSON.stringify(override.files) ===
          JSON.stringify(graphqlConfig.files),
      )

      if (existingConfigIndex !== -1) {
        // Replace existing config with new one
        json.overrides[existingConfigIndex] = graphqlConfig
      } else {
        // Add new config if none exists
        json.overrides.push(graphqlConfig)
      }
    }

    return json
  }

  updateJson(tree, eslintJsonPath, addGraphqlOverrides)
}
