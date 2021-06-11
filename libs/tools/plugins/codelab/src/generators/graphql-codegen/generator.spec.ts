import { readProjectConfiguration, Tree } from '@nrwl/devkit'
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import generator from './generator'
import { GraphqlCodegenGeneratorSchema } from './schema'

describe('graphql-codegen generator', () => {
  let appTree: Tree
  const options: GraphqlCodegenGeneratorSchema = {}

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await generator(appTree, options)

    const config = readProjectConfiguration(appTree, 'test')

    expect(config).toBeDefined()
  })
})
