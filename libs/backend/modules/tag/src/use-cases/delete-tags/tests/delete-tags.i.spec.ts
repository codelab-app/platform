import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { INestApplication } from '@nestjs/common'
import { TagModule } from '../../..'
import { CreateTagInput } from '../../create-tag/create-tag.input'
import {
  TestCreateTagGql,
  TestCreateTagMutation,
} from '../../create-tag/tests/create-tag.api.graphql.gen'
import { createTagInput } from '../../create-tag/tests/create-tag.data'
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

    const { createTag: tagA } = await domainRequest<
      CreateTagInput,
      TestCreateTagMutation
    >(userApp, TestCreateTagGql, createTagInput)

    const { createTag: tagB } = await domainRequest<
      CreateTagInput,
      TestCreateTagMutation
    >(userApp, TestCreateTagGql, createTagInput)

    tagAId = tagA.id
    tagBId = tagB.id
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to delete tags', async () => {
      deleteTagsInput = {
        ids: [tagAId, tagBId],
      }

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

      // await domainRequest<GetTagInput, GetTagQuery>(
      //   userApp,
      //   GetTagGql,
      //   { where: { id: tagAId } },
      //   { message: 'Not found' },
      // )
    })
  })
})
