import { Tree, readProjectConfiguration } from '@nrwl/devkit'
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import generator, { UseCaseGeneratorSchema } from './generator'

describe.skip('@codelab/schematics:use-case', () => {
  let appTree: Tree

  const options: UseCaseGeneratorSchema = {
    name: 'modules-users',
    moduleName: 'users',
    resolverType: 'Mutation',
    useCaseName: 'createUser',
  }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await generator(appTree, options)
    const config = readProjectConfiguration(appTree, 'test')

    console.log(config)

    expect(config).toBeDefined()
  })

  // const testRunner = new SchematicTestRunner(
  //   '@codelab/schematics',
  //   join(__dirname, '../../../../collection.json'),
  // )

  // const { moduleName, projectRoot } = normalizeOptions(options as any)

  // beforeAll(async () => {
  //   appTree = createEmptyWorkspace(Tree.empty())
  //   tree = await testRunner
  //     .runSchematicAsync<DomainModuleSchematicSchema>(
  //       'domain-module',
  //       { name: 'users' },
  //       appTree,
  //     )
  //     .toPromise()

  //   tree = await testRunner
  //     .runSchematicAsync<UseCaseSchematicSchema>('use-case', options, tree)
  //     .toPromise()
  //   console.log(tree.files)
  //   // Calls from dist
  //   // appTree = await callRule(
  //   //   externalSchematic('@codelab/schematics', 'use-case', options),
  //   //   appTree,
  //   // )
  // })

  // describe('Adds files to existing folders', () => {
  //   const expectedFiles = [
  //     'core/application/commands/CreateUserCommand.ts',
  //     'core/application/handlers/CreateUserCommandHandler.ts',

  //     // Use cases
  //     'core/application/useCases/createUser/CreateUserService.ts',
  //     'core/application/useCases/createUser/CreateUserErrors.ts',
  //     'core/application/useCases/createUser/CreateUserRequest.ts',
  //     'core/application/useCases/createUser/CreateUserResponse.ts',
  //     'core/application/useCases/createUser/CreateUserUseCase.i.spec.ts',
  //     'core/application/useCases/createUser/CreateUserUseCase.ts',
  //   ].map((file) => `${projectRoot}/src/${file}`)

  //   test.each(expectedFiles)('%p should exist', (file) => {
  //     expect(tree.exists(file)).toBeTruthy()
  //   })
  // })
})
