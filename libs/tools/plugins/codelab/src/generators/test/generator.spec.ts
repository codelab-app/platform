import { Tree, readProjectConfiguration } from '@nrwl/devkit'
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import generator from './generator'
import { TestGeneratorSchema } from './schema'

describe('test generator', () => {
  let appTree: Tree
  const options: TestGeneratorSchema = { name: 'test' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await generator(appTree, options)
    const config = readProjectConfiguration(appTree, 'test')

    expect(config).toBeDefined()
  })
})
