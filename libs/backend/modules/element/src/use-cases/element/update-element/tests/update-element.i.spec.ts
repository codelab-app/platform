import { domainRequest } from '@codelab/backend/shared/testing'
import { setupElementTestModule } from '../../../../test/setupElementTestModule'
import { createElementInput } from '../../create-element/tests/create-element.data'
import { UpdateElementInput } from '../update-element.input'
import {
  TestUpdateElementGql,
  TestUpdateElementMutation,
} from './update-element.api.graphql.gen'

describe('UpdateElement', () => {
  const testModule = setupElementTestModule()
  let elementId: string
  let updateElementInput: UpdateElementInput

  beforeAll(async () => {
    const results = await testModule.createTestElement(createElementInput)

    elementId = results.id

    expect(elementId).toBeDefined()

    updateElementInput = {
      id: elementId,
      data: {
        name: 'Example Element updated',
      },
    }
  })

  describe('Guest', () => {
    it('should fail to update an element', async () => {
      await domainRequest(
        testModule.guestApp,
        TestUpdateElementGql,
        updateElementInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should update an element', async () => {
      await domainRequest<UpdateElementInput, TestUpdateElementMutation>(
        testModule.userApp,
        TestUpdateElementGql,
        updateElementInput,
      )

      const element = await testModule.getElement({ where: { id: elementId } })

      expect(element).toMatchObject({
        ...updateElementInput.data,
        id: updateElementInput.id,
      })
    })
  })
})
