import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import {
  CreateComponentGql,
  CreateComponentInput,
  CreateComponentMutation,
  CreateElementGql,
  CreateElementInput,
  CreateElementMutation,
  DeleteComponentGql,
  DeleteComponentInput,
  DeleteComponentMutation,
  DeleteElementInput,
  GetComponentGql,
  GetComponentInput,
  GetComponentQuery,
  GetElementGraphInput,
  GetElementInput,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { ComponentModule } from '../../../../component.module'
import { ElementModule } from '../../../../element.module'
import { createElementInput } from '../../../element/create-element/tests/create-element.data'
import { createRootElementInput } from '../../../element/move-element/tests/move-element.data'
import { createComponentInput } from '../../create-component/tests/create-component.data'

describe('DeleteComponent', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let componentId: string
  let deleteComponentInput: DeleteComponentInput
  let getComponentInput: GetComponentInput
  let elementId: string
  let deleteElementInput: DeleteElementInput
  let getElementInput: GetElementInput
  let parentElementId: string
  let getRootInput: GetElementGraphInput

  beforeAll(async () => {
    guestApp = await setupTestModule([ComponentModule, ElementModule], {
      role: Role.GUEST,
    })
    userApp = await setupTestModule([ComponentModule, ElementModule], {
      role: Role.USER,
    })

    // Create root element
    const resultsRootElement: CreateElementMutation = await domainRequest<
      CreateElementInput,
      CreateElementMutation
    >(userApp, CreateElementGql, createRootElementInput)

    parentElementId = resultsRootElement.createElement.id
    console.log(resultsRootElement.createElement)

    getRootInput = {
      elementId: parentElementId,
    }

    expect(parentElementId).toBeDefined()

    // Create component
    const resultsComponent = await domainRequest<
      CreateComponentInput,
      CreateComponentMutation
    >(userApp, CreateComponentGql, createComponentInput)

    componentId = resultsComponent.createComponent.id
    console.log(resultsComponent.createComponent)
    deleteComponentInput = { componentId }
    getComponentInput = { componentId }

    expect(componentId).toBeDefined()

    const input = { ...createElementInput, componentId, parentElementId }
    console.log(input)

    const resultsComponentElement = await domainRequest<
      CreateElementInput,
      CreateElementMutation
    >(userApp, CreateElementGql, input)

    console.log(resultsComponentElement)
    elementId = resultsComponentElement.createElement.id
    deleteElementInput = { elementId }
    getElementInput = { elementId }

    expect(elementId).toBeDefined()
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to delete an component', async () => {
      await domainRequest(guestApp, DeleteComponentGql, deleteComponentInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should delete an component', async () => {
      /*  await domainRequest<DeleteElementInput, DeleteElementMutation>(
        userApp,
        DeleteElementGql,
        deleteElementInput,
      )

      // Should fail to get the deleted element
      const { getElement } = await domainRequest<
        GetElementInput,
        GetElementQuery
      >(userApp, GetElementGql, getElementInput)

      expect(getElement).toBeNull() */

      await domainRequest<DeleteComponentInput, DeleteComponentMutation>(
        userApp,
        DeleteComponentGql,
        deleteComponentInput,
      )

      // Should fail to get the deleted component
      const { getComponent } = await domainRequest<
        GetComponentInput,
        GetComponentQuery
      >(userApp, GetComponentGql, getComponentInput)

      expect(getComponent).toBeNull()
    })
  })
})
