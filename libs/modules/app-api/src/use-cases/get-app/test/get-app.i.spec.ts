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
  GetAppGql,
  GetAppInput,
  GetAppQuery,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '../../../app.module'
import { createAppInput } from '../../create-app/test/create-app.data'

describe('GetApp', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let appId: string
  let getAppInput: GetAppInput

  beforeAll(async () => {
    guestApp = await setupTestModule([AppModule], { role: Role.GUEST })
    userApp = await setupTestModule([AppModule], { role: Role.USER })

    const results = await domainRequest<CreateAppInput, CreateAppMutation>(
      userApp,
      CreateAppGql,
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
      await domainRequest(guestApp, GetAppGql, getAppInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get an app', async () => {
      const results = await domainRequest<GetAppInput, GetAppQuery>(
        userApp,
        GetAppGql,
        getAppInput,
      )

      expect(results?.getApp).toMatchObject({ ...createAppInput, id: appId })
    })
  })
})
