import { join } from 'path'
import { Tree } from '@angular-devkit/schematics'
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing'
import { createTestLib } from '../utils'
import { UseCaseSchematicSchema } from './schema'
import { normalizeOptions } from './schematic'

const SCHEMATIC_NAME = 'use-case'

describe('@codelab/schematics:use-case', () => {
  let appTree: Tree
  let tree: UnitTestTree

  const testRunner = new SchematicTestRunner(
    '@codelab/schematics',
    join(__dirname, '../../../../collection.json'),
  )

  const options: UseCaseSchematicSchema = {
    moduleName: 'user',
    useCaseName: 'createUser',
  }

  const { moduleName, projectRoot } = normalizeOptions(options)

  beforeAll(async () => {
    appTree = await createTestLib('user')

    tree = await testRunner
      .runSchematicAsync<UseCaseSchematicSchema>(
        SCHEMATIC_NAME,
        options,
        appTree,
      )
      .toPromise()

    // tree = await runSchematic(
    //   'use-case',
    //   <UseCaseSchematicSchema>{
    //     useCaseName: 'createUser',
    //     moduleName: 'user',
    //   },
    //   appTree,
    // )
    // appTree = createEmptyWorkspace(Tree.empty())
    // appTree = await testRunner
    //   .runSchematicAsync(SCHEMATIC_NAME, options, appTree)
    //   .toPromise()
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
      expect(appTree.exists(file)).toBeTruthy()
    })
  })
})
