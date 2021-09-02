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
  DeleteComponentGql,
  DeleteComponentInput,
  DeleteComponentMutation,
  GetComponentGql,
  GetComponentInput,
  GetComponentQuery,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { ComponentModule } from '../../../../component.module'
import { ElementModule } from '../../../../element.module'
import { createComponentInput } from '../../create-component/tests/create-component.data'

describe('DeleteComponent', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let componentId: string
  let deleteComponentInput: DeleteComponentInput
  let getComponentInput: GetComponentInput

  beforeAll(async () => {
    guestApp = await setupTestModule([ComponentModule, ElementModule], {
      role: Role.GUEST,
    })
    userApp = await setupTestModule([ComponentModule, ElementModule], {
      role: Role.USER,
    })

    const results = await domainRequest<
      CreateComponentInput,
      CreateComponentMutation
    >(userApp, CreateComponentGql, createComponentInput)

    componentId = results.createComponent.id
    deleteComponentInput = { componentId }
    getComponentInput = { componentId }

    expect(componentId).toBeDefined()
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
