import { domainRequest } from '@codelab/backend/infra'
import { setupTestModule, teardownTestModule } from '@codelab/backend/nestjs'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { ElementModule } from '../../../../element.module'
import { GetComponentInput } from '../../get-component'
import {
  TestGetComponentGql,
  TestGetComponentQuery,
} from '../../get-component/tests/get-component.api.graphql.gen'
import { CreateComponentInput } from '../create-component.input'
import {
  TestCreateComponentGql,
  TestCreateComponentMutation,
} from './create-component.api.graphql.gen'
import { createComponentInput } from './create-component.data'

describe('CreateComponent', () => {
  let guestApp: INestApplication
  let userApp: INestApplication

  beforeAll(async () => {
    guestApp = await setupTestModule([ElementModule], { role: Role.Guest })
    userApp = await setupTestModule([ElementModule], { role: Role.User })
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to create an component', async () => {
      await domainRequest(
        guestApp,
        TestCreateComponentGql,
        createComponentInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should create an component', async () => {
      const {
        createComponent: { id: componentId },
      } = await domainRequest<
        CreateComponentInput,
        TestCreateComponentMutation
      >(userApp, TestCreateComponentGql, createComponentInput)

      expect(componentId).toBeDefined()

      const { getComponent: element } = await domainRequest<
        GetComponentInput,
        TestGetComponentQuery
      >(userApp, TestGetComponentGql, { componentId })

      expect(element).toMatchObject({
        ...createComponentInput,
        id: componentId,
      })
    })
  })
})
