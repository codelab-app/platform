import { domainRequest } from '@codelab/backend/shared/testing'
import { setupElementTestModule } from '../../../../test/setupElementTestModule'
import { createElementInput } from '../../create-element/tests/create-element.data'
import { GetElementGraphInput } from '../get-element-graph.input'
import {
  TestGetElementGraphGql,
  TestGetElementGraphQuery,
} from './get-element-graph.api.graphql.gen'

describe.skip('GetElementGraph', () => {
  const testModule = setupElementTestModule()
  let elementId: string
  let getElementGraphInput: GetElementGraphInput

  beforeAll(async () => {
    const results = await testModule.createTestElement(createElementInput)

    elementId = results.id
    getElementGraphInput = { where: { id: elementId } }

    expect(elementId).toBeDefined()
  })

  describe('Guest', () => {
    it('should fail to get an element', async () => {
      await domainRequest(
        testModule.guestApp,
        TestGetElementGraphGql,
        getElementGraphInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should get an element', async () => {
      const results = await domainRequest<
        GetElementGraphInput,
        TestGetElementGraphQuery
      >(testModule.userApp, TestGetElementGraphGql, getElementGraphInput)

      expect(results?.getElementGraph).toMatchObject({
        vertices: [
          {
            id: elementId,
            ...createElementInput,
          },
        ],
        edges: [],
      })
    })
  })
})
