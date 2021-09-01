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
import { DeleteAppInput } from '../delete-app.input'
import { DeleteAppGql, DeleteAppMutation } from './delete-app.api.graphql'

describe('DeleteApp', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let appId: string
  let deleteAppInput: DeleteAppInput
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
    deleteAppInput = { appId }
    getAppInput = { byId: { appId } }

    expect(appId).toBeDefined()
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to delete an app', async () => {
      await domainRequest(guestApp, DeleteAppGql, deleteAppInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should delete an app', async () => {
      await domainRequest<DeleteAppInput, DeleteAppMutation>(
        userApp,
        DeleteAppGql,
        deleteAppInput,
      )

      const { getApp } = await domainRequest<GetAppInput, GetAppQuery>(
        userApp,
        GetAppGql,
        getAppInput,
      )

      expect(getApp).toBeNull()

      // TODO make sure pages are deleted too
    })
  })
})
