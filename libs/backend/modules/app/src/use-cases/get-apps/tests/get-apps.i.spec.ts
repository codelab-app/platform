import { domainRequest } from '@codelab/backend/shared/testing'
import { setupAppTestModule } from '../../../test/setupAppTestModule'
import { createAppInput } from '../../create-app/tests/create-app.data'
import { TestGetAppsGql, TestGetAppsQuery } from './get-apps.api.graphql.gen'

describe('GetApps', () => {
  const testModule = setupAppTestModule()
  let appId: string

  beforeAll(async () => {
    const results = await testModule.createTestApp(createAppInput)

    appId = results.id

    expect(appId).toBeDefined()
  })

  describe('Guest', () => {
    it('should fail to get apps', async () => {
      await domainRequest(testModule.guestApp, TestGetAppsGql, undefined, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get apps', async () => {
      const results = await domainRequest<any, TestGetAppsQuery>(
        testModule.userApp,
        TestGetAppsGql,
      )

      expect(results?.apps).toMatchObject([{ ...createAppInput, id: appId }])
    })
  })
})
