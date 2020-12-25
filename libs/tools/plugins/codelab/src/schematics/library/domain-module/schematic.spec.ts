import { join } from 'path'
import { Tree } from '@angular-devkit/schematics'
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { DomainModuleSchematicSchema } from './schema'
import { normalizeOptions } from './schematic'

const SCHEMATIC_NAME = 'domain-module'

describe('@codelab/schematics:domain-module', () => {
  let appTree: Tree
  let tree: UnitTestTree

  const testRunner = new SchematicTestRunner(
    '@codelab/schematics',
    join(__dirname, '../../../../collection.json'),
  )

  const options: DomainModuleSchematicSchema = { name: 'test' }

  const { moduleName, projectRoot } = normalizeOptions(options)

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
      'core/adapters/.gitkeep',

      // Core - application
      'core/application/commands/.gitkeep',
      'core/application/handlers/.gitkeep',
      'core/application/queries/.gitkeep',
      'core/application/services/.gitkeep',
      'core/application/useCases/.gitkeep',

      // Core - domain
      'core/domain/dto/.gitkeep',

      // Framework
      `framework/nestjs/${moduleName}Module.ts`,
      `framework/${moduleName}DITokens.ts`,

      // Infrastructure
      `infrastructure/persistence/TypeOrm${moduleName}RepositoryAdapter.ts`,

      // Presentation
      `presentation/controllers/${moduleName}CommandQueryAdapter.ts`,
    ].map((file) => `${projectRoot}/src/${file}`)

    test.each(expectedFiles)('%p should exist', (file) => {
      expect(tree.exists(file)).toBeTruthy()
    })
  })
})
