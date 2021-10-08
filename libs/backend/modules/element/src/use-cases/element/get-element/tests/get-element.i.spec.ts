import { domainRequest } from '@codelab/backend/shared/testing'
import { setupElementTestModule } from '../../../../test/setupElementTestModule'
import { createElementInput } from '../../create-element/tests/create-element.data'
import { GetElementInput } from '../get-element.input'
import { TestGetElementGql } from './get-element.api.graphql.gen'

describe('GetElement', () => {
  const testModule = setupElementTestModule()
  let elementId: string
  let getElementInput: GetElementInput

  beforeAll(async () => {
    const results = await testModule.createTestElement(createElementInput)

    elementId = results.id
    getElementInput = { where: { id: elementId } }

    expect(elementId).toBeDefined()
  })

  describe('Guest', () => {
    it('should fail to get an element', async () => {
      await domainRequest(
        testModule.guestApp,
        TestGetElementGql,
        getElementInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should get an element', async () => {
      const results = await testModule.getElement(getElementInput)

      expect(results).toMatchObject({
        ...createElementInput,
        id: elementId,
      })
    })
  })
})
