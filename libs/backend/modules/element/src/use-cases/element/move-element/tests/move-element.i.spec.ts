import { domainRequest } from '@codelab/backend/shared/testing'
import { TestElementFragment } from '../../../../test/graphql'
import { setupElementTestModule } from '../../../../test/setupElementTestModule'
import { GetElementGraphInput } from '../../get-element-graph'
import {
  TestGetElementGraphGql,
  TestGetElementGraphQuery,
} from '../../get-element-graph/tests/get-element-graph.api.graphql.gen'
import { MoveElementInput } from '../move-element.input'
import {
  TestMoveElementGql,
  TestMoveElementMutation,
} from './move-element.api.graphql.gen'
import {
  createChildElementInputFunc,
  createParent1ElementInputFunc,
  createParent2ElementInputFunc,
  createRootElementInput,
} from './move-element.data'

describe('MoveElement', () => {
  const testModule = setupElementTestModule()
  let rootElementId: string
  let parent1ElementId: string
  let parent2ElementId: string
  let childElementId: string
  let moveElementInput: MoveElementInput
  let getRootInput: GetElementGraphInput

  beforeAll(async () => {
    // Re-used variable for results
    let results: TestElementFragment

    results = await testModule.createTestElement(createRootElementInput)
    rootElementId = results.id

    getRootInput = {
      where: { id: rootElementId },
    }

    expect(rootElementId).toBeDefined()

    //
    // Create parent1 element (root -> parent1)
    //
    const createParent1ElementInput =
      createParent1ElementInputFunc(rootElementId)

    results = await testModule.createTestElement(createParent1ElementInput)
    parent1ElementId = results.id

    expect(parent1ElementId).toBeDefined()

    //
    // Create parent2 element (root -> parent2)
    //

    const createParent2ElementInput =
      createParent2ElementInputFunc(rootElementId)

    results = await testModule.createTestElement(createParent2ElementInput)
    parent2ElementId = results.id

    expect(parent2ElementId).toBeDefined()

    //
    // Create child element (root -> parent1 -> child)
    //
    const createChildElementInput =
      createChildElementInputFunc(parent1ElementId)

    results = await testModule.createTestElement(createParent2ElementInput)

    childElementId = results.id

    expect(childElementId).toBeDefined()

    // Move child element input(root->parent1->child -----> root->parent2->child)
    moveElementInput = {
      elementId: childElementId,
      moveData: {
        parentElementId: parent2ElementId,
        order: 3,
      },
    }
  })

  describe('Guest', () => {
    it('should fail to move an element', async () => {
      await domainRequest(
        testModule.guestApp,
        TestMoveElementGql,
        moveElementInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should move an element', async () => {
      await domainRequest<MoveElementInput, TestMoveElementMutation>(
        testModule.userApp,
        TestMoveElementGql,
        moveElementInput,
      )

      const { getElementGraph: graph } = await domainRequest<
        GetElementGraphInput,
        TestGetElementGraphQuery
      >(testModule.userApp, TestGetElementGraphGql, getRootInput)

      expect(graph).toBeTruthy()

      const foundEdge = graph?.edges.find(
        ({ source, target }) =>
          source === moveElementInput.moveData.parentElementId &&
          target === moveElementInput.elementId,
      )

      expect(foundEdge).toBeDefined()
      expect(foundEdge?.order).toStrictEqual(moveElementInput.moveData.order)
    })
  })
})
