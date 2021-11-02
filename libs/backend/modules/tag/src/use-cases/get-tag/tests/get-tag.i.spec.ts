import { domainRequest } from '@codelab/backend/shared/testing'
import { setupTagTestModule } from '../../../test/setupTagTestModule'
import { createTagInput } from '../../create-tag/tests/create-tag.data'
import { GetTagInput } from '../get-tag.input'
import { TestGetTagGql, TestGetTagQuery } from './get-tag.api.graphql.gen'

describe('GetTagUseCase', () => {
  const testModule = setupTagTestModule()
  let createdTagId: string

  beforeAll(async () => {
    const createTag = await testModule.createTag(createTagInput)

    createdTagId = createTag.id
  })

  describe('Guest', () => {
    it('should fail to get a Tag', async () => {
      await domainRequest<GetTagInput, TestGetTagQuery>(
        testModule.guestApp,
        TestGetTagGql,
        { where: { id: createdTagId } },
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should get Tag by id', async () => {
      const getTag = await testModule.getTag({
        where: { id: createdTagId },
      })

      expect(getTag).toMatchObject(createTagInput)
    })

    it('should get Tag by name', async () => {
      const getTag = await testModule.getTag({
        where: { name: createTagInput.name },
      })

      expect(getTag).toMatchObject(createTagInput)
    })
  })
})
