import { domainRequest } from '@codelab/backend/infra'
import { setupTestModule, teardownTestModule } from '@codelab/backend/nestjs'
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
import { DeleteAppInput } from '../delete-app.input'
import {
  TestDeleteAppGql,
  TestDeleteAppMutation,
} from './delete-app.api.graphql.gen'

describe('DeleteApp', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let appId: string
  let deleteAppInput: DeleteAppInput
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
      await domainRequest(guestApp, TestDeleteAppGql, deleteAppInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should delete an app', async () => {
      const { deleteApp } = await domainRequest<
        DeleteAppInput,
        TestDeleteAppMutation
      >(userApp, TestDeleteAppGql, deleteAppInput)

      expect(deleteApp?.id).toBe(deleteAppInput.appId)

      const { getApp } = await domainRequest<GetAppInput, TestGetAppQuery>(
        userApp,
        TestGetAppGql,
        getAppInput,
      )

      expect(getApp).toBeNull()
    })
  })
})
