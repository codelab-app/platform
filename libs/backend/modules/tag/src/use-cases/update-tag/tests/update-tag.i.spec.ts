import { domainRequest } from '@codelab/backend/shared/testing'
import { setupTagTestModule } from '../../../test/setupTagTestModule'
import { CreateTagInput } from '../../create-tag'
import {
  TestCreateTagGql,
  TestCreateTagMutation,
} from '../../create-tag/tests/create-tag.api.graphql.gen'
import { createTagInput } from '../../create-tag/tests/create-tag.data'
import { GetTagInput } from '../../get-tag'
import {
  TestGetTagGql,
  TestGetTagQuery,
} from '../../get-tag/tests/get-tag.api.graphql.gen'
import { UpdateTagInput } from '../update-tag.input'
import {
  TestUpdateTagGql,
  TestUpdateTagMutation,
} from './update-tag.api.graphql.gen'

describe('UpdateTagUseCase', () => {
  const testModule = setupTagTestModule()
  let updateTagInput: UpdateTagInput
  let createdTagId: string

  beforeAll(async () => {
    const { createTag } = await domainRequest<
      CreateTagInput,
      TestCreateTagMutation
    >(testModule.userApp, TestCreateTagGql, createTagInput)

    createdTagId = createTag.id

    updateTagInput = {
      id: createdTagId,
      data: {
        name: 'Ant Design V2',
      },
    }
  })

  describe('Guest', () => {
    it('should fail to create a Tag', async () => {
      await domainRequest(
        testModule.guestApp,
        TestUpdateTagGql,
        updateTagInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should update a Tag', async () => {
      await domainRequest<UpdateTagInput, TestUpdateTagMutation>(
        testModule.userApp,
        TestUpdateTagGql,
        updateTagInput,
      )

      const { getTag } = await domainRequest<GetTagInput, TestGetTagQuery>(
        testModule.userApp,
        TestGetTagGql,
        { where: { id: createdTagId } },
      )

      expect(getTag).toMatchObject({
        id: createdTagId,
        ...updateTagInput.data,
      })
    })
  })
})
