import { domainRequest } from '@codelab/backend/infra'
import { setupTestModule, teardownTestModule } from '@codelab/backend/nestjs'
import { Role } from '@codelab/shared/abstract/core'
import {
  CreateElementInput,
  DeleteElementInput,
  GetElementInput,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { ComponentModule } from '../../../../component.module'
import { ElementModule } from '../../../../element.module'
import {
  TestCreateElementGql,
  TestCreateElementMutation,
} from '../../../element/create-element/tests/create-element.api.graphql.gen'
import { createElementInput } from '../../../element/create-element/tests/create-element.data'
import {
  TestGetElementGql,
  TestGetElementQuery,
} from '../../../element/get-element/tests/get-element.api.graphql.gen'
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
import {
  TestGetComponentElementsGql,
  TestGetComponentElementsQuery,
} from './get-component-elements.api.graphql.gen'

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

  beforeAll(async () => {
    guestApp = await setupTestModule([ComponentModule, ElementModule], {
      role: Role.Guest,
    })
    userApp = await setupTestModule([ComponentModule, ElementModule], {
      role: Role.User,
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
      TestGetComponentElementsQuery
    >(userApp, TestGetComponentElementsGql, getComponentInput)

    parentElementId = results.getComponentElements?.vertices[0].id || ''

    const input = { ...createElementInput, componentId, parentElementId }

    const resultsComponentElement = await domainRequest<
      CreateElementInput,
      TestCreateElementMutation
    >(userApp, TestCreateElementGql, input)

    elementId = resultsComponentElement.createElement.id
    deleteElementInput = { elementId }
    getElementInput = { elementId }

    const results1 = await domainRequest<
      GetComponentInput,
      TestGetComponentElementsQuery
    >(userApp, TestGetComponentElementsGql, getComponentInput)

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
        TestGetElementQuery
      >(userApp, TestGetElementGql, getElementInput)

      expect(getElement).toBeNull()
    })
  })
})
