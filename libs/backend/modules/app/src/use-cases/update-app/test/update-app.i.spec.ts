import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import {
  CreateAppGql,
  CreateAppInput,
  CreateAppMutation,
  GetAppGql,
  GetAppInput,
  GetAppQuery,
  UpdateAppGql,
  UpdateAppInput,
  UpdateAppMutation,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '../../../app.module'
import { createAppInput } from '../../create-app/test/create-app.data'

describe('UpdateApp', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let appId: string
  let updateAppInput: UpdateAppInput
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
    updateAppInput = {
      id: appId,
      data: { name: 'Test App Updated' },
    }
    getAppInput = { byId: { appId } }

    expect(appId).toBeDefined()
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to update an app', async () => {
      await domainRequest(guestApp, UpdateAppGql, updateAppInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should update an app', async () => {
      await domainRequest<UpdateAppInput, UpdateAppMutation>(
        userApp,
        UpdateAppGql,
        updateAppInput,
      )

      const { getApp: app } = await domainRequest<GetAppInput, GetAppQuery>(
        userApp,
        GetAppGql,
        getAppInput,
      )

      expect(app).toMatchObject({
        ...updateAppInput.data,
        id: appId,
      })
    })
  })
})
