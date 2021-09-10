import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '../../../app.module'
import { GetAppInput } from '../../get-app/get-app.input'
import {
  TestGetAppGql,
  TestGetAppQuery,
} from '../../get-app/tests/get-app.api.graphql.gen'
import { CreateAppInput } from '../create-app.input'
import {
  TestCreateAppGql,
  TestCreateAppMutation,
} from './create-app.api.graphql.gen'
import { createAppInput } from './create-app.data'

describe('CreateApp', () => {
  let guestApp: INestApplication
  let userApp: INestApplication

  beforeAll(async () => {
    guestApp = await setupTestModule([AppModule], { role: Role.Guest })
    userApp = await setupTestModule([AppModule], { role: Role.User })
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to create an App', async () => {
      await domainRequest(guestApp, TestCreateAppGql, createAppInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should create an App', async () => {
      const {
        createApp: { id: appId },
      } = await domainRequest<CreateAppInput, TestCreateAppMutation>(
        userApp,
        TestCreateAppGql,
        createAppInput,
      )

      expect(appId).toBeDefined()

      const { getApp: app } = await domainRequest<GetAppInput, TestGetAppQuery>(
        userApp,
        TestGetAppGql,
        { byId: { appId } },
      )

      expect(app).toMatchObject({ ...createAppInput, id: appId })

      // Should assign app to user
    })
  })
})
