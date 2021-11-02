import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { Linter } from '@nrwl/linter'
import { libraryGenerator } from '@nrwl/react'
import generator from './generator'
import { UiUseCaseGeneratorSchema } from './schema'
import { UseCaseType } from './useCaseType'

describe('ui-use-case generator', () => {
  const options: UiUseCaseGeneratorSchema = {
    name: 'modules-user',
    model: 'user',
    useCaseTypes: [UseCaseType.Create],
  }

  it('should throw an error for a missing module name', async () => {
    const appTree = createTreeWithEmptyWorkspace()

    // https://stackoverflow.com/questions/47144187/can-you-write-async-tests-that-expect-tothrow
    await expect(
      generator(appTree, { ...options, name: 'missing-modules-user' }),
    ).rejects.toThrow()
  })

  describe('It should generate files for create', () => {
    const appTree = createTreeWithEmptyWorkspace()

    beforeAll(async () => {
      await libraryGenerator(appTree, {
        directory: 'modules',
        name: 'user',
        style: 'none',
        skipTsConfig: false,
        skipFormat: false,
        linter: Linter.EsLint,
        unitTestRunner: 'none',
      })

      await generator(appTree, options)
    })

    const expectedFiles = [
      'libs/modules/user/src/useCases/createUser/CreateUserForm.tsx',
      'libs/modules/user/src/useCases/createUser/CreateUserModal.tsx',
    ]

    test.each(expectedFiles)('%p should exist', (file) => {
      expect(appTree.exists(file)).toBeTruthy()
    })
  })

  describe('Overwrite', () => {
    const appTree = createTreeWithEmptyWorkspace()

    const createUserFormPath =
      'libs/modules/user/src/useCases/createUser/CreateUserForm.tsx'

    beforeAll(async () => {
      await libraryGenerator(appTree, {
        directory: 'modules',
        name: 'user',
        style: 'none',
        skipTsConfig: false,
        skipFormat: false,
        linter: Linter.EsLint,
        unitTestRunner: 'none',
      })
    })

    it('should not overwrite existing files', async () => {
      appTree.write(createUserFormPath, 'Codelab')
      // await generator(appTree, options)

      const CreateUserForm = appTree.read(createUserFormPath)?.toString()

      expect(CreateUserForm).toStrictEqual('Codelab')
    })
  })
})
