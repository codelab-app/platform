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
import { GetAppInput } from '../../get-app/get-app.input'
import { GetAppGql, GetAppQuery } from '../../get-app/tests/get-app.api.graphql'
import { UpdateAppInput } from '../update-app.input'
import { UpdateAppGql, UpdateAppMutation } from './update-app.api.graphql'

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
