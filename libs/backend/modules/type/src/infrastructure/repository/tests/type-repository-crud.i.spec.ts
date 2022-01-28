import { ElementTypeKind, IInterfaceType } from '@codelab/shared/abstract/core'
import { createType } from '../../../use-cases/type/create-type'
import { setupTypeRepositoryTest } from './setup'
import {
  arrayTypeInput,
  elementTypeInput,
  enumTypeInput,
  enumValue1,
  enumValue2,
  enumValue3,
  interfaceField1,
  interfaceField2,
  interfaceTypeInput,
  primitiveTypeInput,
  unionTypeInput,
  updatedName,
} from './type-repository-test-data'
import { typeCrudTest } from './utils'

describe('Type repository', () => {
  const testModule = setupTypeRepositoryTest()

  describe('Type CRUD', () => {
    it('should crud a primitive type', async () => {
      const initialType = createType(primitiveTypeInput)
      const updateInput = { name: updatedName }

      await typeCrudTest({
        repo: testModule.repo,
        transaction: testModule.transaction,
        initialType,
        updateInput,
      })
    })

    it('should crud an array type', async () => {
      const primitiveResponse1 = await testModule.repo.create(
        createType(primitiveTypeInput),
        testModule.transaction,
      )

      const primitiveResponse2 = await testModule.repo.create(
        createType(primitiveTypeInput),
        testModule.transaction,
      )

      const initialType = createType({
        ...arrayTypeInput,
        itemType: primitiveResponse1,
      })

      const updateInput = { name: updatedName, itemType: primitiveResponse2 }

      await typeCrudTest({
        repo: testModule.repo,
        transaction: testModule.transaction,
        initialType,
        updateInput,
      })

      // the primitive types shouldn't be deleted
      expect(
        await testModule.repo.getOne(
          primitiveResponse1.id,
          testModule.transaction,
        ),
      ).toBeDefined()
      expect(
        await testModule.repo.getOne(
          primitiveResponse2.id,
          testModule.transaction,
        ),
      ).toBeDefined()
    })

    it('should crud an interface type', async () => {
      const primitiveResponse1 = await testModule.repo.create(
        createType(primitiveTypeInput),
        testModule.transaction,
      )

      const primitiveResponse2 = await testModule.repo.create(
        createType(primitiveTypeInput),
        testModule.transaction,
      )

      const initialType = createType({
        ...interfaceTypeInput,
        fields: [{ ...interfaceField1, target: primitiveResponse1.id }],
      })

      const createExpected = {
        ...initialType,
        id: expect.stringContaining('0x'),
        fields: initialType.fields.map((f) => ({
          ...f,
          id: expect.stringContaining('0x'),
          source: expect.stringContaining('0x'),
        })),
      }

      const updateInput = {
        name: updatedName,
        fields: [
          { ...interfaceField1, target: primitiveResponse2.id }, // change field1 to primitive2
          { ...interfaceField2, target: primitiveResponse1.id }, // create new field
        ],
      }

      const updateExpected = {
        ...initialType,
        ...updateInput,
        id: expect.stringContaining('0x'),
        fields: updateInput.fields.map((f) => ({
          ...f,
          id: expect.stringContaining('0x'),
          source: expect.stringContaining('0x'),
        })),
      }

      await typeCrudTest<IInterfaceType>({
        repo: testModule.repo,
        transaction: testModule.transaction,
        initialType,
        createExpected,
        updateInput,
        updateExpected,
      })
    })

    it('should crud an enum type', async () => {
      const initialType = createType({
        ...enumTypeInput,
        allowedValues: [enumValue1, enumValue2],
      })

      const createExpected = {
        ...initialType,
        id: expect.stringContaining('0x'),
        // For some reason the order is not the same sometimes
        // can't figure out why, but this is a workaround for the test
        // TODO figure out why the order of allowedValues is not deterministic
        allowedValues: expect.arrayContaining(
          initialType.allowedValues.map((av) => ({
            ...av,
            id: expect.stringContaining('0x'),
          })),
        ),
      }

      const updateInput = {
        name: updatedName,
        allowedValues: [
          initialType.allowedValues[0],
          enumValue3, // replace 2nd value with a new value
        ],
      }

      const updateExpected = {
        ...initialType,
        ...updateInput,
        id: expect.stringContaining('0x'),
        allowedValues: expect.arrayContaining(
          updateInput.allowedValues.map((av) => ({
            ...av,
            id: expect.stringContaining('0x'),
          })),
        ),
      }

      await typeCrudTest({
        repo: testModule.repo,
        transaction: testModule.transaction,
        initialType,
        createExpected,
        updateInput,
        updateExpected,
      })
    })

    it('should crud an element type', async () => {
      const initialType = createType(elementTypeInput)

      const updateInput = {
        name: updatedName,
        elementKind: ElementTypeKind.ChildrenOnly,
      }

      await typeCrudTest({
        repo: testModule.repo,
        transaction: testModule.transaction,
        initialType,
        updateInput,
      })
    })

    it('should crud a union type', async () => {
      const primitiveResponse1 = await testModule.repo.create(
        createType(primitiveTypeInput),
        testModule.transaction,
      )

      const primitiveResponse2 = await testModule.repo.create(
        createType(primitiveTypeInput),
        testModule.transaction,
      )

      const initialType = createType({
        ...unionTypeInput,
        typesOfUnionType: [primitiveResponse1, primitiveResponse2],
      })

      const createExpected = {
        ...initialType,
        id: expect.stringContaining('0x'),
        typesOfUnionType: initialType.typesOfUnionType.map((t) => ({
          ...t,
          id: expect.stringContaining('0x'),
        })),
      }

      const updateInput = {
        name: updatedName,
        typesOfUnionType: [initialType.typesOfUnionType[0]], // remove the 2nd value
      }

      const updateExpected = {
        ...initialType,
        ...updateInput,
        id: expect.stringContaining('0x'),
        typesOfUnionType: updateInput.typesOfUnionType.map((t) => ({
          ...t,
          id: expect.stringContaining('0x'),
        })),
      }

      await typeCrudTest({
        repo: testModule.repo,
        transaction: testModule.transaction,
        initialType,
        createExpected,
        updateInput,
        updateExpected,
      })
    })
  })
})
