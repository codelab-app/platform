import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { Role } from '@codelab/shared/abstract/core'
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
import { UpdateComponentInput } from '../update-component.input'
import {
  TestUpdateComponentGql,
  TestUpdateComponentMutation,
} from './update-component.api.graphql.gen'

describe('UpdateComponent', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let componentId: string
  let updateComponentInput: UpdateComponentInput

  beforeAll(async () => {
    guestApp = await setupTestModule([ComponentModule, ElementModule], {
      role: Role.Guest,
    })
    userApp = await setupTestModule([ComponentModule, ElementModule], {
      role: Role.User,
    })

    const results = await domainRequest<
      CreateComponentInput,
      TestCreateComponentMutation
    >(userApp, TestCreateComponentGql, createComponentInput)

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
      await domainRequest(
        guestApp,
        TestUpdateComponentGql,
        updateComponentInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should update an component', async () => {
      await domainRequest<UpdateComponentInput, TestUpdateComponentMutation>(
        userApp,
        TestUpdateComponentGql,
        updateComponentInput,
      )

      const { getComponent: component } = await domainRequest<
        GetComponentInput,
        TestGetComponentQuery
      >(userApp, TestGetComponentGql, { componentId })

      expect(component).toMatchObject({
        ...updateComponentInput.updateData,
        id: updateComponentInput.componentId,
      })
    })
  })
})
