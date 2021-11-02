import { domainRequest } from '@codelab/backend/shared/testing'
import { setupAppTestModule } from '../../../test/setupAppTestModule'
import { CreateAppInput } from '../../create-app'
import {
  TestCreateAppGql,
  TestCreateAppMutation,
} from '../../create-app/tests/create-app.api.graphql.gen'
import { createAppInput } from '../../create-app/tests/create-app.data'
import { GetAppInput } from '../../get-app/get-app.input'
import { DeleteAppInput } from '../delete-app.input'
import {
  TestDeleteAppGql,
  TestDeleteAppMutation,
} from './delete-app.api.graphql.gen'

describe('DeleteApp', () => {
  const testModule = setupAppTestModule(false)
  let appId: string
  let deleteAppInput: DeleteAppInput
  let getAppInput: GetAppInput

  beforeAll(async () => {
    const results = await domainRequest<CreateAppInput, TestCreateAppMutation>(
      testModule.userApp,
      TestCreateAppGql,
      createAppInput,
    )

    appId = results.createApp.id
    deleteAppInput = { appId }
    getAppInput = { byId: { appId } }

    expect(appId).toBeDefined()
  })

  describe('Guest', () => {
    it('should fail to delete an app', async () => {
      await domainRequest(
        testModule.guestApp,
        TestDeleteAppGql,
        deleteAppInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should delete an app', async () => {
      const { deleteApp } = await domainRequest<
        DeleteAppInput,
        TestDeleteAppMutation
      >(testModule.userApp, TestDeleteAppGql, deleteAppInput)

      expect(deleteApp?.id).toBe(deleteAppInput.appId)

      const getApp = await testModule.getApp({ byId: { appId } })

      expect(getApp).toBeNull()
    })
  })
})
