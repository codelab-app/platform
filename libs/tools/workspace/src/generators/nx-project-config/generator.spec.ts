import type { Tree } from '@nx/devkit'

import { readProjectConfiguration } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { Linter } from '@nx/eslint'
import { libraryGenerator } from '@nx/react'

import type { ProjectConfigGeneratorSchema } from './schema'

import { nxProjectConfigGenerator } from './generator'

describe('project.json lint settings', () => {
  let tree: Tree
  const LIB_NAME = 'my-lib'
  const options: ProjectConfigGeneratorSchema = {}

  beforeEach(async () => {
    tree = createTreeWithEmptyWorkspace()

    await libraryGenerator(tree, {
      directory: 'libs/tools/workspace',
      linter: Linter.EsLint,
      name: LIB_NAME,
      style: 'none',
    })
  })

  // We moved config to nx.json
  it.skip('should update the ci settings', async () => {
    await nxProjectConfigGenerator(tree, options)

    const project = readProjectConfiguration(tree, LIB_NAME)
    const lintCiConfig = project.targets?.lint?.configurations?.['ci']

    expect(lintCiConfig.format).toBe('junit')
    expect(lintCiConfig.outputFile).toBe(`tmp/reports/lint/${LIB_NAME}.xml`)
  })
})
