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
  CreateTagGql,
  CreateTagMutation,
} from '../../create-tag/tests/create-tag.api.graphql'
import { createTagInput } from '../../create-tag/tests/create-tag.data'
import { DeleteTagsInput } from '../delete-tags.input'
import { DeleteTagsGql, DeleteTagsMutation } from './delete-tags.api.graphql'

describe('DeleteTagUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let deleteTagsInput: DeleteTagsInput
  let tagAId: string
  let tagBId: string

  beforeAll(async () => {
    guestApp = await setupTestModule([TagModule], { role: Role.GUEST })
    userApp = await setupTestModule([TagModule], { role: Role.USER })

    const { createTag: tagA } = await domainRequest<
      CreateTagInput,
      CreateTagMutation
    >(userApp, CreateTagGql, createTagInput)

    const { createTag: tagB } = await domainRequest<
      CreateTagInput,
      CreateTagMutation
    >(userApp, CreateTagGql, createTagInput)

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

      await domainRequest<DeleteTagsInput, DeleteTagsMutation>(
        guestApp,
        DeleteTagsGql,
        deleteTagsInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should delete a Tag', async () => {
      await domainRequest<DeleteTagsInput, DeleteTagsMutation>(
        userApp,
        DeleteTagsGql,
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
