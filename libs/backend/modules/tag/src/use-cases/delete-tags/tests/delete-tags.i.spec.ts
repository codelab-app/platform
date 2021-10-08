import { domainRequest } from '@codelab/backend/shared/testing'
import { setupTagTestModule } from '../../../test/setupTagTestModule'
import { createTagGraphs, createTags } from '../../create-tag'
import { DeleteTagsInput } from '../delete-tags.input'
import {
  TestDeleteTagsGql,
  TestDeleteTagsMutation,
} from './delete-tags.api.graphql.gen'

describe('DeleteTagUseCase', () => {
  const testModule = setupTagTestModule()
  let deleteTagsInput: DeleteTagsInput
  let tagAId: string
  let tagBId: string

  beforeAll(async () => {
    const { tagA, tagB } = await createTags(testModule.userApp)

    tagAId = tagA.id
    tagBId = tagB.id

    deleteTagsInput = {
      ids: [tagAId, tagBId],
    }
  })

  describe('Guest', () => {
    it('should fail to delete tags', async () => {
      await domainRequest<DeleteTagsInput, TestDeleteTagsMutation>(
        testModule.guestApp,
        TestDeleteTagsGql,
        deleteTagsInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should delete a Tag', async () => {
      await domainRequest<DeleteTagsInput, TestDeleteTagsMutation>(
        testModule.userApp,
        TestDeleteTagsGql,
        deleteTagsInput,
      )

      const getTag = await testModule.getTag({ where: { id: tagAId } })

      expect(getTag).toBeNull()
    })

    it('should cascade delete tags', async () => {
      const { parentTag, childTag } = await createTagGraphs(testModule.userApp)

      await domainRequest<DeleteTagsInput, TestDeleteTagsMutation>(
        testModule.userApp,
        TestDeleteTagsGql,
        {
          ids: [parentTag.id],
        },
      )

      const getParentTag = await testModule.getTag({
        where: { id: parentTag.id },
      })

      const getChildTag = await testModule.getTag({
        where: { id: childTag.id },
      })

      expect(getParentTag).toBeNull()
      expect(getChildTag).toBeNull()
    })
  })
})
