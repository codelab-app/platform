import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
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
import { GetComponentInput } from '../get-component.input'
import {
  TestGetComponentGql,
  TestGetComponentQuery,
} from './get-component.api.graphql.gen'

describe('GetComponent', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let componentId: string
  let getComponentInput: GetComponentInput

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
    getComponentInput = { componentId }

    expect(componentId).toBeDefined()
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to get an component', async () => {
      await domainRequest(guestApp, TestGetComponentGql, getComponentInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get an component', async () => {
      const results = await domainRequest<
        GetComponentInput,
        TestGetComponentQuery
      >(userApp, TestGetComponentGql, getComponentInput)

      expect(results?.getComponent).toMatchObject({
        ...createComponentInput,
        id: componentId,
      })
    })
  })
})
