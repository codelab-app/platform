import { join } from 'path'
import { Tree } from '@angular-devkit/schematics'
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { DomainModuleSchematicSchema } from '../../../../../../../../dist/libs/tools/plugins/codelab/src/schematics/library/domain-module/schema'
import { UseCaseSchematicSchema } from './schema'
import { normalizeOptions } from './schematic'

describe('@codelab/schematics:use-case', () => {
  let appTree: Tree
  let tree: UnitTestTree

  const options: UseCaseSchematicSchema = {
    moduleName: 'userss',
    resolverType: 'Mutation',
    resolverMethodName: 'createUser',
    useCaseName: 'createUser',
  }

  const testRunner = new SchematicTestRunner(
    '@codelab/schematics',
    join(__dirname, '../../../../collection.json'),
  )

  const { moduleName, projectRoot } = normalizeOptions(options)

  beforeAll(async () => {
    appTree = createEmptyWorkspace(Tree.empty())
    tree = await testRunner
      .runSchematicAsync<DomainModuleSchematicSchema>(
        'domain-module',
        { name: 'userss' },
        appTree,
      )
      .toPromise()

    tree = await testRunner
      .runSchematicAsync<UseCaseSchematicSchema>('use-case', options, tree)
      .toPromise()
    console.log(tree.files)
    // Calls from dist
    // appTree = await callRule(
    //   externalSchematic('@codelab/schematics', 'use-case', options),
    //   appTree,
    // )
  })

  describe('Adds files to existing folders', () => {
    const expectedFiles = [
      'core/application/commands/CreateUserCommand.ts',
      'core/application/handlers/CreateUserCommandHandler.ts',
      'core/application/services/CreateUserService.ts',

      // Use cases
      'core/application/useCases/createUser/CreateUserErrors.ts',
      'core/application/useCases/createUser/CreateUserRequest.ts',
      'core/application/useCases/createUser/CreateUserResponse.ts',
      'core/application/useCases/createUser/CreateUserUseCase.i.spec.ts',
      'core/application/useCases/createUser/CreateUserUseCase.ts',
    ].map((file) => `${projectRoot}/src/${file}`)

    test.each(expectedFiles)('%p should exist', (file) => {
      expect(tree.exists(file)).toBeTruthy()
    })
  })
})
