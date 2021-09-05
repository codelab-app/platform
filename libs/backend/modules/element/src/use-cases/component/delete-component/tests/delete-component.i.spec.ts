import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { INestApplication } from '@nestjs/common'
import { ComponentModule } from '../../../../component.module'
import { ElementModule } from '../../../../element.module'
import { CreateComponentInput } from '../../create-component'
import {
  TestCreateComponentGql,
  TestCreateComponentMutation,
} from '../../create-component/tests/create-component.api.graphql.gen'
import { createComponentInput } from '../../create-component/tests/create-component.data'
import { GetComponentInput } from '../../get-component'
import {
  TestGetComponentGql,
  TestGetComponentQuery,
} from '../../get-component/tests/get-component.api.graphql.gen'
import { DeleteComponentInput } from '../delete-component.input'
import {
  TestDeleteComponentGql,
  TestDeleteComponentMutation,
} from './delete-component.api.graphql.gen'

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

    // Create component
    const resultsComponent = await domainRequest<
      CreateComponentInput,
      TestCreateComponentMutation
    >(userApp, TestCreateComponentGql, createComponentInput)

    componentId = resultsComponent.createComponent.id

    deleteComponentInput = { componentId }
    getComponentInput = { componentId }

    expect(componentId).toBeDefined()

    const results = await domainRequest<
      GetComponentInput,
      GetComponentElementsQuery
    >(userApp, GetComponentElementsGql, getComponentInput)

    parentElementId = results.getComponentElements?.vertices[0].id || ''

    const input = { ...createElementInput, componentId, parentElementId }

    const resultsComponentElement = await domainRequest<
      CreateElementInput,
      CreateElementMutation
    >(userApp, CreateElementGql, input)

    elementId = resultsComponentElement.createElement.id
    deleteElementInput = { elementId }
    getElementInput = { elementId }

    const results1 = await domainRequest<
      GetComponentInput,
      GetComponentElementsQuery
    >(userApp, GetComponentElementsGql, getComponentInput)

    expect(elementId).toBeDefined()
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to delete an component', async () => {
      await domainRequest(
        guestApp,
        TestDeleteComponentGql,
        deleteComponentInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should delete an component', async () => {
      await domainRequest<DeleteComponentInput, TestDeleteComponentMutation>(
        userApp,
        TestDeleteComponentGql,
        deleteComponentInput,
      )

      // Should fail to get the deleted component
      const { getComponent } = await domainRequest<
        GetComponentInput,
        TestGetComponentQuery
      >(userApp, TestGetComponentGql, getComponentInput)

      expect(getComponent).toBeNull()

      const { getElement } = await domainRequest<
        GetElementInput,
        GetElementQuery
      >(userApp, GetElementGql, getElementInput)

      expect(getElement).toBeNull()
    })
  })
})
