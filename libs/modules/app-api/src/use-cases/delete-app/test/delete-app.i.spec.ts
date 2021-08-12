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
  DeleteAppGql,
  DeleteAppInput,
  DeleteAppMutation,
  GetAppGql,
  GetAppInput,
  GetAppQuery,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '../../../app.module'
import { createAppInput } from '../../create-app/test/create-app.data'

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

      // Should fail to get the deleted app
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
