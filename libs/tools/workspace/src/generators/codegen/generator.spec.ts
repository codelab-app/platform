import type { Tree } from '@nx/devkit'
import { readProjectConfiguration } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { Linter } from '@nx/linter'
import { libraryGenerator } from '@nx/react'
import { codegenGenerator } from './generator'
import type { CodegenGeneratorSchema } from './schema'

describe('codegen generator', () => {
  let tree: Tree
  const LIB_NAME = 'my-lib'
  const options: CodegenGeneratorSchema = { name: 'test' }

  beforeEach(async () => {
    tree = createTreeWithEmptyWorkspace()

    await libraryGenerator(tree, {
      linter: Linter.EsLint,
      name: LIB_NAME,
      style: 'none',
    })
  })

  it('should run successfully', async () => {
    await codegenGenerator(tree, options)

    const config = readProjectConfiguration(tree, 'test')

    expect(config).toBeDefined()
  })
})
