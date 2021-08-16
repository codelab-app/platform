import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import {
  CreateElementGql,
  CreateElementInput,
  CreateElementMutation,
  GetElementGql,
  GetElementInput,
  GetElementQuery,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { ElementModule } from '../../../../element.module'
import { createElementInput } from './create-element.data'

describe('CreateElement', () => {
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
    it('should fail to create an element', async () => {
      await domainRequest(guestApp, CreateElementGql, createElementInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should create an element', async () => {
      const {
        createElement: { id: elementId },
      } = await domainRequest<CreateElementInput, CreateElementMutation>(
        userApp,
        CreateElementGql,
        createElementInput,
      )

      expect(elementId).toBeDefined()

      const { getElement: element } = await domainRequest<
        GetElementInput,
        GetElementQuery
      >(userApp, GetElementGql, { elementId })

      console.log(element)

      expect(element).toMatchObject({ ...createElementInput, id: elementId })
    })
  })
})
