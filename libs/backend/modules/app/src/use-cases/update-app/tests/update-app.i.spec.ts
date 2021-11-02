import { domainRequest } from '@codelab/backend/shared/testing'
import { setupAppTestModule } from '../../../test/setupAppTestModule'
import { createAppInput } from '../../create-app/tests/create-app.data'
import { UpdateAppInput } from '../update-app.input'
import {
  TestUpdateAppGql,
  TestUpdateAppMutation,
} from './update-app.api.graphql.gen'

describe('UpdateApp', () => {
  const testModule = setupAppTestModule(false)
  let appId: string
  let updateAppInput: UpdateAppInput

  beforeAll(async () => {
    const results = await testModule.createTestApp(createAppInput)

    appId = results.id
    updateAppInput = {
      id: appId,
      data: { name: 'Test App Updated' },
    }

    expect(appId).toBeDefined()
  })

  describe('Guest', () => {
    it('should fail to update an app', async () => {
      await domainRequest(
        testModule.guestApp,
        TestUpdateAppGql,
        updateAppInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should update an app', async () => {
      const { updateApp } = await domainRequest<
        UpdateAppInput,
        TestUpdateAppMutation
      >(testModule.userApp, TestUpdateAppGql, updateAppInput)

      expect(updateApp).toBeDefined()

      expect({
        id: updateApp?.id,
        name: updateApp?.name,
      }).toMatchObject({
        ...updateAppInput.data,
        id: appId,
      })
    })
  })
})
