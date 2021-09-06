import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '../../../app.module'
import { CreateAppInput } from '../../create-app'
import {
  TestCreateAppGql,
  TestCreateAppMutation,
} from '../../create-app/tests/create-app.api.graphql.gen'
import { createAppInput } from '../../create-app/tests/create-app.data'
import { GetAppInput } from '../get-app.input'
import { TestGetAppGql, TestGetAppQuery } from './get-app.api.graphql.gen'

describe('GetApp', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let appId: string
  let getAppInput: GetAppInput

  beforeAll(async () => {
    guestApp = await setupTestModule([AppModule], { role: Role.Guest })
    userApp = await setupTestModule([AppModule], { role: Role.User })

    const results = await domainRequest<CreateAppInput, TestCreateAppMutation>(
      userApp,
      TestCreateAppGql,
      createAppInput,
    )

    appId = results.createApp.id
    getAppInput = { byId: { appId } }

    expect(appId).toBeDefined()
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to get an app', async () => {
      await domainRequest(guestApp, TestGetAppGql, getAppInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get an app', async () => {
      const results = await domainRequest<GetAppInput, TestGetAppQuery>(
        userApp,
        TestGetAppGql,
        getAppInput,
      )

      expect(results?.getApp).toMatchObject({ ...createAppInput, id: appId })
    })
  })
})
