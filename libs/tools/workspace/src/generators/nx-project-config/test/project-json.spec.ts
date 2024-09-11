import {
  type ProjectConfiguration,
  readProjectConfiguration,
  type Tree,
} from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { libraryGenerator } from '@nx/js'
import type { LibraryGeneratorSchema } from '@nx/js/src/utils/schema'
import { mergeDeep } from 'remeda'
import { updateTestConfig } from './project-json'
import { updateJestConfig } from './update-jest-config'

describe('updateTestConfig', () => {
  let tree: Tree
  const libName = 'test-lib'

  const defaultOptions: LibraryGeneratorSchema = {
    config: 'workspace',
    directory: `libs/${libName}`,
    name: libName,
    projectNameAndRootFormat: 'as-provided',
    setParserOptionsProject: true,
    strict: true,
    unitTestRunner: 'jest',
  }

  const integrationTestConfig: ProjectConfiguration['targets'] = {
    'test:integration': {
      configurations: {
        ci: {
          parallel: 3,
        },
        dev: {
          reporters: ['default'],
        },
        test: {
          reporters: ['default'],
        },
      },
      defaultConfiguration: 'dev',
      options: {
        color: true,
        memoryLimit: 8192,
        runInBand: true,
        testPathPattern: ['i.spec.ts'],
      },
    },
  }

  const unitTestConfig: ProjectConfiguration['targets'] = {
    'test:unit': {
      configurations: {
        ci: {},
        dev: {
          reporters: ['default'],
        },
        test: {
          reporters: ['default'],
        },
      },
      defaultConfiguration: 'dev',
      options: {
        color: true,
        memoryLimit: 8192,
        parallel: 3,
        testPathIgnorePatterns: ['i.spec.ts'],
      },
    },
  }

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it('should not modify project config if test target is missing', async () => {
    await libraryGenerator(tree, {
      ...defaultOptions,
    })

    const projectConfig = readProjectConfiguration(tree, libName)

    console.log('Files in the directory:')

    expect(tree.exists(`${projectConfig.root}/jest.config.ts`)).toBeTruthy()

    updateTestConfig(tree, projectConfig)

    expect(projectConfig.targets?.['test:integration']).toMatchObject(
      mergeDeep(projectConfig., integrationTestConfig),
    )
  })
})
