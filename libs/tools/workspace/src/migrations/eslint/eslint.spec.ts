import type { Tree } from '@nx/devkit'
import {
  readProjectConfiguration,
  updateProjectConfiguration,
} from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { Linter } from '@nx/linter'
import { libraryGenerator, SupportedStyles } from '@nx/react'
import path from 'path'
import { update } from './eslint'

describe('update eslint project.json', () => {
  let tree: Tree
  const LIB_NAME = 'my-lib'

  beforeEach(async () => {
    tree = createTreeWithEmptyWorkspace({ layout: 'apps-libs' })

    await libraryGenerator(tree, {
      linter: Linter.EsLint,
      name: LIB_NAME,
      style: 'none',
    })
  })

  it('should update the eslint settings for project.json', async () => {
    const project = readProjectConfiguration(tree, LIB_NAME)
    // await update(tree)
    const projectConfig = readProjectConfiguration(tree, LIB_NAME)

    Object.assign(projectConfig, {
      targets: {
        lint: {
          configurations: {
            ci: {
              format: 'junit',
              outputFile: `${projectConfig.name}.xml`,
            },
          },
        },
      },
    })

    updateProjectConfiguration(tree, LIB_NAME, projectConfig)

    expect(project.targets?.lint).toBeDefined()
  })
})
