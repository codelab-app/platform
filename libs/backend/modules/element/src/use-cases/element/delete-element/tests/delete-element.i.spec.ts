import { domainRequest } from '@codelab/backend/shared/testing'
import { setupElementTestModule } from '../../../../test/setupElementTestModule'
import { createElementInput } from '../../create-element/tests/create-element.data'
import { GetElementInput } from '../../get-element'
import { DeleteElementInput } from '../delete-element.input'
import {
  TestDeleteElementGql,
  TestDeleteElementMutation,
} from './delete-element.api.graphql.gen'

describe('DeleteElement', () => {
  const testModule = setupElementTestModule()
  let elementId: string
  let deleteElementInput: DeleteElementInput
  let getElementInput: GetElementInput

  beforeAll(async () => {
    const results = await testModule.createTestElement(createElementInput)

    elementId = results.id
    deleteElementInput = { elementId }
    getElementInput = { where: { id: elementId } }

    expect(elementId).toBeDefined()
  })

  describe('Guest', () => {
    it('should fail to delete an element', async () => {
      await domainRequest(
        testModule.guestApp,
        TestDeleteElementGql,
        deleteElementInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should delete an element', async () => {
      await domainRequest<DeleteElementInput, TestDeleteElementMutation>(
        testModule.userApp,
        TestDeleteElementGql,
        deleteElementInput,
      )

      // Should fail to get the deleted element
      const getElement = await testModule.getElement(getElementInput)

      expect(getElement).toBeNull()
    })
  })
})
