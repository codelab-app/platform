import { domainRequest } from '@codelab/backend/shared/testing'
import { setupTagTestModule } from '../../../test/setupTagTestModule'
import { TestUpsertTagGql } from './upsert-tag.api.graphql.gen'

describe.skip('UpsertTagUseCase', () => {
  const testModule = setupTagTestModule()

  describe('Guest', () => {
    it('should fail to create a Tag', async () => {
      await domainRequest(
        testModule.guestApp,
        TestUpsertTagGql,
        {},
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  // describe('User', () => {
  //   it('should create an App', async () => {
  //     const {
  //       createApp: { id: appId },
  //     } = await domainRequest<UpsertTagInput, UpsertTagMutation>(
  //       userApp,
  //       UpsertTagGql,
  //       createAppInput,
  //     )

  //     expect(appId).toBeDefined()

  //     const { getApp: app } = await domainRequest<GetAppInput, GetAppQuery>(
  //       userApp,
  //       GetAppGql,
  //       { byId: { appId } },
  //     )

  //     expect(app).toMatchObject({ ...createAppInput, id: appId })
  //   })
  // })
})
