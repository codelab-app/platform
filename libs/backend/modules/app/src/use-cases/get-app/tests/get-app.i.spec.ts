import { domainRequest } from '@codelab/backend/shared/testing'
import { setupAppTestModule } from '../../../test/setupAppTestModule'
import { createAppInput } from '../../create-app/tests/create-app.data'
import { GetAppInput } from '../get-app.input'
import { TestGetAppGql } from './get-app.api.graphql.gen'

describe('GetApp', () => {
  const testModule = setupAppTestModule(false)
  let appId: string
  let getAppByIdInput: GetAppInput

  beforeAll(async () => {
    const results = await testModule.createTestApp(createAppInput)

    appId = results.id
    getAppByIdInput = { byId: { appId } }

    expect(appId).toBeDefined()
  })

  describe('Guest', () => {
    it('should fail to get an app', async () => {
      await domainRequest(testModule.guestApp, TestGetAppGql, getAppByIdInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get an app', async () => {
      const getApp = await testModule.getApp(getAppByIdInput)

      expect(getApp).toMatchObject({ ...createAppInput, id: appId })
    })
  })
})
