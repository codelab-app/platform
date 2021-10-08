import { domainRequest } from '@codelab/backend/shared/testing'
import { setupTypeTestModule } from '../../../../tests/setupTypeTestModule'
import { createPrimitiveStringInput } from '../../create-type/tests/create-type.data'
import { GetTypesInput } from '../get-types.input'
import { TestGetTypesGql, TestGetTypesQuery } from './get-types.api.graphql.gen'

describe('GetTypes', () => {
  const testModule = setupTypeTestModule()
  let typeId: string
  let getTypesByIdInput: GetTypesInput
  let getTypesByKindInput: GetTypesInput
  let getTypesByNameInput: GetTypesInput

  beforeAll(async () => {
    const type = await testModule.createTestType(createPrimitiveStringInput)

    typeId = type.id
    getTypesByIdInput = { byIds: { typeIds: [typeId] } }

    getTypesByKindInput = {
      byKind: { kind: createPrimitiveStringInput.typeKind },
    }
    getTypesByNameInput = { byName: { name: createPrimitiveStringInput.name } }
  })

  describe('Guest', () => {
    it('should not get type', async () => {
      await domainRequest<GetTypesInput>(
        testModule.guestApp,
        TestGetTypesGql,
        getTypesByIdInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should get types by id', async () => {
      const { getTypes } = await domainRequest<
        GetTypesInput,
        TestGetTypesQuery
      >(testModule.userApp, TestGetTypesGql, getTypesByIdInput)

      const type = getTypes[0] || {}

      expect(type).toMatchObject({
        __typename: 'PrimitiveType',
        name: createPrimitiveStringInput.name,
        typeKind: createPrimitiveStringInput.typeKind,
      })
    })

    it('should get types by primitive kind', async () => {
      const { getTypes } = await domainRequest<
        GetTypesInput,
        TestGetTypesQuery
      >(testModule.userApp, TestGetTypesGql, getTypesByKindInput)

      const type = getTypes[0] || {}

      expect(type).toMatchObject({
        __typename: 'PrimitiveType',
        name: createPrimitiveStringInput.name,
        typeKind: createPrimitiveStringInput.typeKind,
      })
    })

    it('should get types by name', async () => {
      const { getTypes } = await domainRequest<
        GetTypesInput,
        TestGetTypesQuery
      >(testModule.userApp, TestGetTypesGql, getTypesByNameInput)

      const type = getTypes[0] || {}

      expect(type).toMatchObject({
        __typename: 'PrimitiveType',
        name: createPrimitiveStringInput.name,
        typeKind: createPrimitiveStringInput.typeKind,
      })
    })
  })
})
