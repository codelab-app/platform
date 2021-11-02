import { domainRequest } from '@codelab/backend/shared/testing'
import { setupTypeTestModule } from '../../../../tests/setupTypeTestModule'
import { createPrimitiveStringInput } from '../../create-type/tests/create-type.data'
import { GetTypeInput } from '../get-type.input'
import { TestGetTypeGql } from './get-type.api.graphql.gen'

describe('GetType', () => {
  const testModule = setupTypeTestModule()
  let typeId: string
  let getTypeInput: GetTypeInput

  beforeAll(async () => {
    const type = await testModule.createTestType(createPrimitiveStringInput)

    typeId = type.id
    getTypeInput = { where: { id: typeId } }
  })

  describe('Guest', () => {
    it('should not get type', async () => {
      await domainRequest<GetTypeInput>(
        testModule.guestApp,
        TestGetTypeGql,
        getTypeInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    // TODO: get type specs:
    // - test if the graph contains all sub types
    // - test if the subtypes are well arranged with edges
    // - test arrays, interfaces

    it('should create a string', async () => {
      expect(true).toBeTruthy()
    })
  })
})
