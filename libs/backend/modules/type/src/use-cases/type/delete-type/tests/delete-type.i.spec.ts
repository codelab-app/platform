import { domainRequest } from '@codelab/backend/shared/testing'
import { setupTypeTestModule } from '../../../../tests/setupTypeTestModule'
import { createPrimitiveStringInput } from '../../create-type/tests/create-type.data'
import { DeleteTypeInput } from '../delete-type.input'
import { TestDeleteTypeGql } from './delete-type.api.graphql.gen'

describe('DeleteType', () => {
  const testModule = setupTypeTestModule()
  let deleteTypeInput: DeleteTypeInput
  let typeId: string

  beforeAll(async () => {
    const type = await testModule.createTestType(createPrimitiveStringInput)

    typeId = type.id
    deleteTypeInput = { typeId }
  })

  describe('Guest', () => {
    it('should not delete type', async () => {
      await domainRequest<DeleteTypeInput>(
        testModule.guestApp,
        TestDeleteTypeGql,
        deleteTypeInput,
        { message: 'Unauthorized' },
      )
    })
  })

  describe('User', () => {
    // TODO: delete type specs:
    // - type doesn't get deleted if it's an API to an atom
    // - type doesn't get deleted if it's referenced in some fields
    // - make sure all fields are deleted when deleting interface

    it('should delete type', async () => {
      await domainRequest<DeleteTypeInput>(
        testModule.userApp,
        TestDeleteTypeGql,
        deleteTypeInput,
      )

      const type = await testModule.getType({ where: { id: typeId } })

      expect(type).toBeNull()
    })
  })
})
