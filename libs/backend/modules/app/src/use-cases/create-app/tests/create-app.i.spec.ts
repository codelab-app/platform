import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '../../../app.module'
import { GetAppInput } from '../../get-app/get-app.input'
import { GetAppGql, GetAppQuery } from '../../get-app/tests/get-app.api.graphql'
import { CreateAppInput } from '../create-app.input'
import { CreateAppGql, CreateAppMutation } from './create-app.api.graphql'
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
      const {
        createApp: { id: appId },
      } = await domainRequest<CreateAppInput, CreateAppMutation>(
        userApp,
        CreateAppGql,
        createAppInput,
      )

      expect(appId).toBeDefined()

      const { getApp: app } = await domainRequest<GetAppInput, GetAppQuery>(
        userApp,
        GetAppGql,
        { byId: { appId } },
      )

      expect(app).toMatchObject({ ...createAppInput, id: appId })
    })
  })
})
