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
  GetComponentGql,
  GetComponentInput,
  GetComponentQuery,
  UpdateComponentGql,
  UpdateComponentInput,
  UpdateComponentMutation,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { ComponentModule } from '../../../../component.module'
import { ElementModule } from '../../../../element.module'
import { createComponentInput } from '../../create-component/tests/create-component.data'

describe('UpdateComponent', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let componentId: string
  let updateComponentInput: UpdateComponentInput

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

    expect(componentId).toBeDefined()

    updateComponentInput = {
      componentId,
      updateData: {
        name: 'Example Component updated',
      },
    }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to update an component', async () => {
      await domainRequest(guestApp, UpdateComponentGql, updateComponentInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should update an component', async () => {
      await domainRequest<UpdateComponentInput, UpdateComponentMutation>(
        userApp,
        UpdateComponentGql,
        updateComponentInput,
      )

      const { getComponent: component } = await domainRequest<
        GetComponentInput,
        GetComponentQuery
      >(userApp, GetComponentGql, { componentId })

      expect(component).toMatchObject({
        ...updateComponentInput.updateData,
        id: updateComponentInput.componentId,
      })
    })
  })
})
