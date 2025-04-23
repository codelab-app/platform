import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { Tree, readProjectConfiguration } from '@nx/devkit'

import { buildableViteGenerator } from './generators'
import { BuildableViteGeneratorSchema } from './schema'

describe('buildable-vite generator', () => {
  let tree: Tree
  const options: BuildableViteGeneratorSchema = { name: 'test' }

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await buildableViteGenerator(tree, options)
    const config = readProjectConfiguration(tree, 'test')
    expect(config).toBeDefined()
  })
})
