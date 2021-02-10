import { join } from 'path'
import { Tree } from '@angular-devkit/schematics'
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { normalizeOptions } from './generator'
import { DomainModuleSchematicSchema } from './schema'

const SCHEMATIC_NAME = 'domain-module'

describe.skip('@codelab/schematics:domain-module', () => {
  let appTree: Tree
  let tree: UnitTestTree

  const options: DomainModuleSchematicSchema = { name: 'test' }

  const { moduleNamePascalCase, projectRoot } = normalizeOptions(options)

  const testRunner = new SchematicTestRunner(
    '@codelab/schematics',
    join(__dirname, '../../../../collection.json'),
  )

  beforeAll(async () => {
    appTree = createEmptyWorkspace(Tree.empty())
    tree = await testRunner
      .runSchematicAsync(SCHEMATIC_NAME, options, appTree)
      .toPromise()
  })

  describe('Files created in lib folder', () => {
    const expectedFiles = [
      // Common
      'common/.gitkeep',

      // Core - adapters
      `core/adapters/${moduleNamePascalCase}RepositoryPort.ts`,

      // Core - application
      'core/application/commands/.gitkeep',
      'core/application/handlers/.gitkeep',
      'core/application/queries/.gitkeep',
      'core/application/services/.gitkeep',
      'core/application/useCases/.gitkeep',

      // Core - domain
      'core/domain/dto/.gitkeep',

      // Framework
      `framework/nestjs/${moduleNamePascalCase}Module.ts`,
      `framework/${moduleNamePascalCase}DITokens.ts`,

      // Infrastructure
      `infrastructure/persistence/TypeOrm${moduleNamePascalCase}RepositoryAdapter.ts`,

      // Presentation
      `presentation/controllers/${moduleNamePascalCase}CommandQueryAdapter.ts`,
    ].map((file) => `${projectRoot}/src/${file}`)

    test.each(expectedFiles)('%p should exist', (file) => {
      expect(tree.exists(file)).toBeTruthy()
    })
  })
})
