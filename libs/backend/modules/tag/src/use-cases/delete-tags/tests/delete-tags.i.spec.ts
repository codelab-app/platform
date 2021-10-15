import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { Role } from '@codelab/shared/abstract/core'
import { GetTagInput } from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { TagModule } from '../../..'
import { createTagGraphs, createTags } from '../../create-tag'
import {
  TestGetTagGql,
  TestGetTagQuery,
} from '../../get-tag/tests/get-tag.api.graphql.gen'
import { DeleteTagsInput } from '../delete-tags.input'
import {
  TestDeleteTagsGql,
  TestDeleteTagsMutation,
} from './delete-tags.api.graphql.gen'

describe('DeleteTagUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let deleteTagsInput: DeleteTagsInput
  let tagAId: string
  let tagBId: string

  beforeAll(async () => {
    guestApp = await setupTestModule([TagModule], { role: Role.Guest })
    userApp = await setupTestModule([TagModule], { role: Role.User })

    const { tagA, tagB } = await createTags(userApp)

    tagAId = tagA.id
    tagBId = tagB.id

    deleteTagsInput = {
      ids: [tagAId, tagBId],
    }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to delete tags', async () => {
      await domainRequest<DeleteTagsInput, TestDeleteTagsMutation>(
        guestApp,
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
        userApp,
        TestDeleteTagsGql,
        deleteTagsInput,
      )

      const { getTag } = await domainRequest<GetTagInput, TestGetTagQuery>(
        userApp,
        TestGetTagGql,
        { where: { id: tagAId } },
      )

      expect(getTag).toBeNull()
    })

    it('should cascade delete tags', async () => {
      const { parentTag, childTag } = await createTagGraphs(userApp)

      await domainRequest<DeleteTagsInput, TestDeleteTagsMutation>(
        userApp,
        TestDeleteTagsGql,
        {
          ids: [parentTag.id],
        },
      )

      const { getTag: getParentTag } = await domainRequest<
        GetTagInput,
        TestGetTagQuery
      >(userApp, TestGetTagGql, { where: { id: parentTag.id } })

      const { getTag: getChildTag } = await domainRequest<
        GetTagInput,
        TestGetTagQuery
      >(userApp, TestGetTagGql, { where: { id: childTag.id } })

      expect(getParentTag).toBeNull()
      expect(getChildTag).toBeNull()
    })
  })
})
