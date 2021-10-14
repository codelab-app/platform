import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { ElementModule } from '../../../../element.module'
import { CreateElementInput } from '../../create-element'
import {
  TestCreateElementGql,
  TestCreateElementMutation,
} from '../../create-element/tests/create-element.api.graphql.gen'
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
  let guestApp: INestApplication
  let userApp: INestApplication
  let rootElementId: string
  let parent1ElementId: string
  let parent2ElementId: string
  let childElementId: string
  let moveElementInput: MoveElementInput
  let getRootInput: GetElementGraphInput

  beforeAll(async () => {
    guestApp = await setupTestModule([ElementModule], { role: Role.Guest })
    userApp = await setupTestModule([ElementModule], { role: Role.User })

    // Create root element
    let results: TestCreateElementMutation

    results = await domainRequest<
      CreateElementInput,
      TestCreateElementMutation
    >(userApp, TestCreateElementGql, createRootElementInput)
    rootElementId = results.createElement.id

    getRootInput = {
      elementId: rootElementId,
    }

    expect(rootElementId).toBeDefined()

    // Create parent1 element(root->parent1)
    const createParent1ElementInput =
      createParent1ElementInputFunc(rootElementId)

    results = await domainRequest<
      CreateElementInput,
      TestCreateElementMutation
    >(userApp, TestCreateElementGql, createParent1ElementInput)
    parent1ElementId = results.createElement.id

    expect(parent1ElementId).toBeDefined()

    // Create parent2 element(root->parent2)
    const createParent2ElementInput =
      createParent2ElementInputFunc(rootElementId)

    results = await domainRequest<
      CreateElementInput,
      TestCreateElementMutation
    >(userApp, TestCreateElementGql, createParent2ElementInput)
    parent2ElementId = results.createElement.id

    expect(parent2ElementId).toBeDefined()

    // Create child element(root->parent1->child)
    const createChildElementInput =
      createChildElementInputFunc(parent1ElementId)

    results = await domainRequest<
      CreateElementInput,
      TestCreateElementMutation
    >(userApp, TestCreateElementGql, createChildElementInput)
    childElementId = results.createElement.id

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

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to move an element', async () => {
      await domainRequest(guestApp, TestMoveElementGql, moveElementInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should move an element', async () => {
      await domainRequest<MoveElementInput, TestMoveElementMutation>(
        userApp,
        TestMoveElementGql,
        moveElementInput,
      )

      const { getElementGraph: graph } = await domainRequest<
        GetElementGraphInput,
        TestGetElementGraphQuery
      >(userApp, TestGetElementGraphGql, getRootInput)

      expect(graph).toBeTruthy()

      const foundEdge = graph?.edges.find(
        ({ source, target }) =>
          source === moveElementInput.moveData.parentElementId &&
          target === moveElementInput.elementId,
      )

      expect(foundEdge).toBeDefined()
      expect(foundEdge?.order).toBe(moveElementInput.moveData.order)
    })
  })
})
