import { domainRequest } from '@codelab/backend/shared/testing'
import { setupTagTestModule } from '../../../test/setupTagTestModule'
import { createTags, tagAData, tagBData } from '../../create-tag'
import { TestGetTagsGql, TestGetTagsQuery } from './get-tags.api.graphql.gen'

describe('GetTagsUseCase', () => {
  const testModule = setupTagTestModule()

  beforeAll(async () => {
    await createTags(testModule.userApp)
  })

  describe('Guest', () => {
    it('should fail to create a Tag', async () => {
      await domainRequest<unknown, TestGetTagsQuery>(
        testModule.guestApp,
        TestGetTagsGql,
        {},
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should get Tags', async () => {
      const { getTags } = await domainRequest<unknown, TestGetTagsQuery>(
        testModule.userApp,
        TestGetTagsGql,
      )

      expect(getTags).toMatchObject([tagAData, tagBData])
    })
  })
})
