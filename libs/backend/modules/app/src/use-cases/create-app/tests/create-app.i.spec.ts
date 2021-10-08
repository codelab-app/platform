import { testUserUid } from '@codelab/backend/shared/generic'
import { domainRequest } from '@codelab/backend/shared/testing'
import { setupAppTestModule } from '../../../test/setupAppTestModule'
import { TestCreateAppGql } from './create-app.api.graphql.gen'
import { createAppInput } from './create-app.data'

describe('CreateApp', () => {
  const testModule = setupAppTestModule(false)

  describe('Guest', () => {
    it('should fail to create an App', async () => {
      await domainRequest(
        testModule.guestApp,
        TestCreateAppGql,
        createAppInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should create an App', async () => {
      const createApp = await testModule.createTestApp(createAppInput)

      expect(createApp).toMatchObject({
        ...createAppInput,
        id: createApp.id,
        ownerId: testUserUid,
      })

      const getApp = await testModule.getApp({
        byId: { appId: createApp.id },
      })

      expect(getApp).toMatchObject({
        ...createAppInput,
        id: createApp.id,
        ownerId: testUserUid,
      })

      // Should assign app to user
    })
  })
})
