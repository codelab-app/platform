import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  CreateAppGql,
  CreateAppInput,
  CreateAppMutation,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '../../../app.module'
import { createAppInput } from './create-app.data'

describe('CreateApp', () => {
  let guestApp: INestApplication
  let userApp: INestApplication

  beforeAll(async () => {
    guestApp = await setupTestModule([AppModule], { role: Role.GUEST })
    userApp = await setupTestModule([AppModule], { role: Role.USER })
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to create an App', async () => {
      await domainRequest(guestApp, CreateAppGql, createAppInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should create an App', async () => {
      const results = await domainRequest<CreateAppInput, CreateAppMutation>(
        userApp,
        CreateAppGql,
        createAppInput,
      )

      expect(results.createApp.id).toBeDefined()
      expect(results.createApp).toMatchObject(createAppInput)
    })
  })
})
