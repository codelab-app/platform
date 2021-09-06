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
import { GetAppInput } from '../../get-app/get-app.input'
import {
  TestGetAppGql,
  TestGetAppQuery,
} from '../../get-app/tests/get-app.api.graphql.gen'
import { UpdateAppInput } from '../update-app.input'
import {
  TestUpdateAppGql,
  TestUpdateAppMutation,
} from './update-app.api.graphql.gen'

describe('UpdateApp', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let appId: string
  let updateAppInput: UpdateAppInput
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
      await domainRequest(guestApp, TestUpdateAppGql, updateAppInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should update an app', async () => {
      await domainRequest<UpdateAppInput, TestUpdateAppMutation>(
        userApp,
        TestUpdateAppGql,
        updateAppInput,
      )

      const { getApp: app } = await domainRequest<GetAppInput, TestGetAppQuery>(
        userApp,
        TestGetAppGql,
        getAppInput,
      )

      expect(app).toMatchObject({
        ...updateAppInput.data,
        id: appId,
      })
    })
  })
})
