import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { INestApplication } from '@nestjs/common'
import { ElementModule } from '../../../../element.module'
import { GetElementInput } from '../../get-element/get-element.input'
import {
  TestGetElementGql,
  TestGetElementQuery,
} from '../../get-element/tests/get-element.api.graphql.gen'
import { CreateElementInput } from '../create-element.input'
import {
  TestCreateElementGql,
  TestCreateElementMutation,
} from './create-element.api.graphql.gen'
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
      await domainRequest(guestApp, TestCreateElementGql, createElementInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should create an element', async () => {
      const {
        createElement: { id: elementId },
      } = await domainRequest<CreateElementInput, TestCreateElementMutation>(
        userApp,
        TestCreateElementGql,
        createElementInput,
      )

      expect(elementId).toBeDefined()

      const { getElement: element } = await domainRequest<
        GetElementInput,
        TestGetElementQuery
      >(userApp, TestGetElementGql, { elementId })

      expect(element).toMatchObject({ ...createElementInput, id: elementId })
    })
  })
})
