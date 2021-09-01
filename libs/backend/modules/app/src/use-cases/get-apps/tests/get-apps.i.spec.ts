import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '../../../app.module'
import { CreateAppInput } from '../../create-app/create-app.input'
import {
  CreateAppGql,
  CreateAppMutation,
} from '../../create-app/tests/create-app.api.graphql'
import { createAppInput } from '../../create-app/tests/create-app.data'
import { GetAppsGql, GetAppsQuery } from './get-apps.api.graphql'

describe('GetApps', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let appId: string

  beforeAll(async () => {
    guestApp = await setupTestModule([AppModule], { role: Role.GUEST })
    userApp = await setupTestModule([AppModule], { role: Role.USER })

    const results = await domainRequest<CreateAppInput, CreateAppMutation>(
      userApp,
      CreateAppGql,
      createAppInput,
    )

    appId = results.createApp.id

    expect(appId).toBeDefined()
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to get apps', async () => {
      await domainRequest(guestApp, GetAppsGql, undefined, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get apps', async () => {
      const results = await domainRequest<any, GetAppsQuery>(
        userApp,
        GetAppsGql,
      )

      expect(results?.apps).toMatchObject([{ ...createAppInput, id: appId }])
    })
  })
})
