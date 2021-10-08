import { domainRequest } from '@codelab/backend/shared/testing'
import { setupTagTestModule } from '../../../test/setupTagTestModule'
import { createTagInput } from '../../create-tag/tests/create-tag.data'
import { GetTagInput } from '../../get-tag'
import {
  TestGetTagGql,
  TestGetTagQuery,
} from '../../get-tag/tests/get-tag.api.graphql.gen'

describe('GetTagUseCase', () => {
  const testModule = setupTagTestModule()
  let getTagInput: GetTagInput

  beforeAll(async () => {
    const { id: tagId } = await testModule.createTag(createTagInput)

    getTagInput = {
      where: {
        id: tagId,
      },
    }
  })

  describe('Guest', () => {
    it('should fail to get a Tag', async () => {
      await domainRequest(testModule.guestApp, TestGetTagGql, getTagInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get a Tag', async () => {
      const { getTag: tag } = await domainRequest<GetTagInput, TestGetTagQuery>(
        testModule.userApp,
        TestGetTagGql,
        getTagInput,
      )

      expect(tag).toMatchObject({ ...createTagInput, id: getTagInput.where.id })
    })
  })
})
