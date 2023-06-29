import type { Tree } from '@nx/devkit'
import { readProjectConfiguration } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { Linter } from '@nx/linter'
import { libraryGenerator } from '@nx/react'
import { nxProjectConfigGenerator } from './generator'
import type { EslintGeneratorSchema } from './schema'

describe('project.json lint settings', () => {
  let tree: Tree
  const LIB_NAME = 'my-lib'
  const options: EslintGeneratorSchema = { name: 'test' }

  beforeEach(async () => {
    tree = createTreeWithEmptyWorkspace()

    await libraryGenerator(tree, {
      linter: Linter.EsLint,
      name: LIB_NAME,
      style: 'none',
    })
  })

  it('should update the ci settings', async () => {
    await nxProjectConfigGenerator(tree, options)

    const project = readProjectConfiguration(tree, LIB_NAME)
    const lintCiConfig = project.targets?.lint?.configurations?.['ci']

    expect(lintCiConfig.format).toBe('junit')
    expect(lintCiConfig.outputFile).toBe(`tmp/reports/lint/${LIB_NAME}.xml`)
  })
})
