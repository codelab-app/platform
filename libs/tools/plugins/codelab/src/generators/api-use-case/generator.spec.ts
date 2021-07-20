import { Tree } from '@nrwl/devkit'
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { libraryGenerator } from '@nrwl/nest'
import generator from './generator'
import { ApiUseCaseGeneratorSchema } from './schema'

describe('api-use-case generator', () => {
  let appTree: Tree

  const options: ApiUseCaseGeneratorSchema = {
    name: 'modules-user-api',
    useCaseName: 'createUser',
    modelName: 'user',
  }

  beforeEach(async () => {
    appTree = createTreeWithEmptyWorkspace()

    // Create Nest.js library
    await libraryGenerator(appTree, {
      directory: 'modules',
      name: 'user-api',
    })

    await generator(appTree, options)
  })

  it('should throw an error for a missing module name', async () => {
    // https://stackoverflow.com/questions/47144187/can-you-write-async-tests-that-expect-tothrow
    await expect(
      generator(appTree, { ...options, name: 'modules-missing-api' }),
    ).rejects.toThrow()
  })

  describe('it should generate files', () => {
    const expectedFiles = [
      'libs/modules/user-api/src/use-cases/create-user/create-user.service.ts',
      'libs/modules/user-api/src/use-cases/create-user/create-user.input.ts',
    ]

    test.each(expectedFiles)('%p should exist', (file) => {
      expect(appTree.exists(file)).toBeTruthy()
    })
  })
})
