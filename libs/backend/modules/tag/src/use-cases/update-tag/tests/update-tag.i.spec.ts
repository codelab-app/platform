import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import {
  CreateTagGql,
  CreateTagInput,
  CreateTagMutation,
  GetTagGql,
  GetTagInput,
  GetTagQuery,
  UpdateTagGql,
  UpdateTagInput,
  UpdateTagMutation,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { TagModule } from '../../../tag.module'
import { createTagInput } from '../../create-tag/tests/create-tag.data'

describe('UpdateTagUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let updateTagInput: UpdateTagInput
  let createdTagId: string

  beforeAll(async () => {
    guestApp = await setupTestModule([TagModule], { role: Role.GUEST })
    userApp = await setupTestModule([TagModule], { role: Role.USER })

    const { createTag } = await domainRequest<
      CreateTagInput,
      CreateTagMutation
    >(userApp, CreateTagGql, createTagInput)

    createdTagId = createTag.id

    updateTagInput = {
      id: createdTagId,
      data: {
        name: 'Ant Design V2',
      },
    }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to create a Tag', async () => {
      await domainRequest(guestApp, UpdateTagGql, updateTagInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should update a Tag', async () => {
      await domainRequest<UpdateTagInput, UpdateTagMutation>(
        userApp,
        UpdateTagGql,
        updateTagInput,
      )

      const { getTag } = await domainRequest<GetTagInput, GetTagQuery>(
        userApp,
        GetTagGql,
        { id: createdTagId },
      )

      expect(getTag).toMatchObject({
        id: createdTagId,
        ...updateTagInput.data,
      })
    })
  })
})
