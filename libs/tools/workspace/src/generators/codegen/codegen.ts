import type { Tree } from '@nx/devkit'
import { readProjectConfiguration } from '@nx/devkit'
import { graphqlCodegen } from './graphql-codegen'

/**
 * @deprecated Not used since it's impossible to break up each module to its own types, too much dependency
 */
export const codegen = async (tree: Tree, projectName: string) => {
  const projectConfig = readProjectConfiguration(tree, projectName)
  const { name, sourceRoot } = projectConfig

  if (!sourceRoot || !name) {
    throw new Error('Missing project configurations')
  }

  await graphqlCodegen(sourceRoot, name)
}
