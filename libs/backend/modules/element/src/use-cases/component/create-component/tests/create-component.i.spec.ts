import { domainRequest } from '@codelab/backend/shared/testing'
import { setupElementTestModule } from '../../../../test/setupElementTestModule'
import { GetElementGraphInput } from '../../../element/get-element-graph'
import {
  TestGetElementGraphGql,
  TestGetElementGraphQuery,
} from '../../../element/get-element-graph/tests/get-element-graph.api.graphql.gen'
import { CreateComponentInput } from '../create-component.input'
import {
  TestCreateComponentGql,
  TestCreateComponentMutation,
} from './create-component.api.graphql.gen'
import { createComponentInput } from './create-component.data'

describe('CreateComponent', () => {
  const testModule = setupElementTestModule()

  describe('Guest', () => {
    it('should fail to create an component', async () => {
      await domainRequest(
        testModule.guestApp,
        TestCreateComponentGql,
        createComponentInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should create an component', async () => {
      const {
        createComponent: { id: componentId },
      } = await domainRequest<
        CreateComponentInput,
        TestCreateComponentMutation
      >(testModule.userApp, TestCreateComponentGql, createComponentInput)

      expect(componentId).toBeDefined()

      const { getElementGraph: elementGraph } = await domainRequest<
        GetElementGraphInput,
        TestGetElementGraphQuery
      >(testModule.userApp, TestGetElementGraphGql, {
        where: { id: componentId },
      })

      expect(elementGraph).toStrictEqual(
        expect.objectContaining({
          vertices: [
            expect.objectContaining({
              id: expect.any(String),
              name: expect.any(String),
              componentTag: expect.objectContaining({
                id: expect.any(String),
                name: createComponentInput.name,
              }),
              css: null,
              props: '{}',
              renderForEachPropKey: null,
              renderIfPropKey: null,
            }),
          ],
          edges: [],
        }),
      )
    })
  })
})
