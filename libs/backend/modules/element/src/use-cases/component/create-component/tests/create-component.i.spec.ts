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
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { ElementModule } from '../../../../element.module'
import { createComponentInput } from './create-component.data'

describe('CreateComponent', () => {
  let guestApp: INestApplication
  let userApp: INestApplication

  beforeAll(async () => {
    guestApp = await setupTestModule([ElementModule], { role: Role.GUEST })
    userApp = await setupTestModule([ElementModule], { role: Role.USER })
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to create an component', async () => {
      await domainRequest(guestApp, CreateComponentGql, createComponentInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should create an component', async () => {
      const {
        createComponent: { id: componentId },
      } = await domainRequest<CreateComponentInput, CreateComponentMutation>(
        userApp,
        CreateComponentGql,
        createComponentInput,
      )

      expect(componentId).toBeDefined()

      const { getComponent: element } = await domainRequest<
        GetComponentInput,
        GetComponentQuery
      >(userApp, GetComponentGql, { componentId })

      expect(element).toMatchObject({
        ...createComponentInput,
        id: componentId,
      })
    })
  })
})
