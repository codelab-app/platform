import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  CreateElementGql,
  CreateElementInput,
  CreateElementMutation,
  GetElementGraphGql,
  GetElementGraphQuery,
  GetElementInput,
  MoveElementGql,
  MoveElementInput,
  MoveElementMutation,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { ElementModule } from '../../../element.module'
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
  let getRootInput: GetElementInput

  beforeAll(async () => {
    guestApp = await setupTestModule([ElementModule], { role: Role.GUEST })
    userApp = await setupTestModule([ElementModule], { role: Role.USER })

    // Create root element
    let results: CreateElementMutation

    results = await domainRequest<CreateElementInput, CreateElementMutation>(
      userApp,
      CreateElementGql,
      createRootElementInput,
    )
    rootElementId = results.createElement.id

    getRootInput = {
      elementId: rootElementId,
    }

    expect(rootElementId).toBeDefined()

    // Create parent1 element(root->parent1)
    const createParent1ElementInput =
      createParent1ElementInputFunc(rootElementId)

    results = await domainRequest<CreateElementInput, CreateElementMutation>(
      userApp,
      CreateElementGql,
      createParent1ElementInput,
    )
    parent1ElementId = results.createElement.id

    expect(parent1ElementId).toBeDefined()

    // Create parent2 element(root->parent2)
    const createParent2ElementInput =
      createParent2ElementInputFunc(rootElementId)

    results = await domainRequest<CreateElementInput, CreateElementMutation>(
      userApp,
      CreateElementGql,
      createParent2ElementInput,
    )
    parent2ElementId = results.createElement.id

    expect(parent2ElementId).toBeDefined()

    // Create child element(root->parent1->child)
    const createChildElementInput =
      createChildElementInputFunc(parent1ElementId)

    results = await domainRequest<CreateElementInput, CreateElementMutation>(
      userApp,
      CreateElementGql,
      createChildElementInput,
    )
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
      await domainRequest(guestApp, MoveElementGql, moveElementInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should move an element', async () => {
      await domainRequest<MoveElementInput, MoveElementMutation>(
        userApp,
        MoveElementGql,
        moveElementInput,
      )

      const { getElementGraph: graph } = await domainRequest<
        GetElementInput,
        GetElementGraphQuery
      >(userApp, GetElementGraphGql, getRootInput)

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
