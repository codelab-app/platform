import { domainRequest } from '@codelab/backend/shared/testing'
import { PrimitiveTypeKind, TypeKind } from '@codelab/shared/abstract/core'
import { setupTypeTestModule } from '../../../../tests/setupTypeTestModule'
import { CreateTypeInput } from '../inputs/create-type.input'
import { TestCreateTypeGql } from './create-type.api.graphql.gen'
import {
  createInterfaceTypeInput,
  createPrimitiveStringInput,
} from './create-type.data'

describe('CreateType', () => {
  const testModule = setupTypeTestModule()

  describe('Guest', () => {
    it('should not create type', async () => {
      await domainRequest<CreateTypeInput>(
        testModule.guestApp,
        TestCreateTypeGql,
        createPrimitiveStringInput,
        { message: 'Unauthorized' },
      )
    })
  })

  describe('User', () => {
    // TODO add for other types

    it('should create a primitive type', async () => {
      const type = await testModule.createTestType(createPrimitiveStringInput)

      const doMatch = (actual: any) =>
        expect(actual).toMatchObject({
          __typename: 'PrimitiveType',
          id: type.id,
          name: createPrimitiveStringInput.name,
          primitiveKind: PrimitiveTypeKind.String,
          typeKind: TypeKind.PrimitiveType,
        })

      doMatch(type)

      const getType = await testModule.getType({ where: { id: type.id } })

      doMatch(getType)
    })

    it('should create interface type', async () => {
      const type = await testModule.createTestType(createInterfaceTypeInput)

      const doMatch = (actual: any) =>
        expect(actual).toMatchObject({
          __typename: 'InterfaceType',
          name: createInterfaceTypeInput.name,
          typeKind: TypeKind.InterfaceType,
        })

      doMatch(type)

      const getType = await testModule.getType({ where: { id: type.id } })

      doMatch(getType)
    })
  })
})
