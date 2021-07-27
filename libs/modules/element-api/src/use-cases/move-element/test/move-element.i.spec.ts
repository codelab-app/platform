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
  ElementFragment,
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
  let rootElement: ElementFragment
  let parent1Element: ElementFragment
  let parent2Element: ElementFragment
  let childElement: ElementFragment
  let moveElementInput: MoveElementInput

  beforeAll(async () => {
    guestApp = await setupTestModule([ElementModule], { role: Role.GUEST })
    userApp = await setupTestModule([ElementModule], { role: Role.USER })

    // Create root element
    let results: any
    results = await domainRequest<CreateElementInput, CreateElementMutation>(
      userApp,
      CreateElementGql,
      createRootElementInput,
    )
    rootElement = results.createElement

    expect(rootElement.id).toBeDefined()
    expect(rootElement).toMatchObject(createRootElementInput)

    // Create parent1 element(root->parent1)
    const createParent1ElementInput = createParent1ElementInputFunc(
      rootElement.id,
    )

    results = await domainRequest<CreateElementInput, CreateElementMutation>(
      userApp,
      CreateElementGql,
      createParent1ElementInput,
    )
    parent1Element = results.createElement

    expect(parent1Element.id).toBeDefined()
    expect(parent1Element.name).toMatch(createParent1ElementInput.name)

    // Create parent2 element(root->parent2)
    const createParent2ElementInput = createParent2ElementInputFunc(
      rootElement.id,
    )

    results = await domainRequest<CreateElementInput, CreateElementMutation>(
      userApp,
      CreateElementGql,
      createParent2ElementInput,
    )
    parent2Element = results.createElement

    expect(parent2Element.id).toBeDefined()
    expect(parent2Element.name).toMatch(createParent2ElementInput.name)

    // Create child element(root->parent1->child)
    const createChildElementInput = createChildElementInputFunc(
      parent1Element.id,
    )

    results = await domainRequest<CreateElementInput, CreateElementMutation>(
      userApp,
      CreateElementGql,
      createChildElementInput,
    )
    childElement = results.createElement

    expect(childElement.id).toBeDefined()
    expect(childElement.name).toMatch(createChildElementInput.name)

    // Move child element input(root->parent1->child -----> root->parent2->child)
    moveElementInput = {
      elementId: childElement.id,
      moveData: {
        parentElementId: parent2Element.id,
        order: 1,
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
      const results = await domainRequest<
        MoveElementInput,
        MoveElementMutation
      >(userApp, MoveElementGql, moveElementInput)

      expect(results.moveElement).toMatchObject(childElement)
    })
  })
})
