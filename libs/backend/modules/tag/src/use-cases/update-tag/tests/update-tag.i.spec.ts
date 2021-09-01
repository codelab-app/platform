import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { INestApplication } from '@nestjs/common'
import { TagModule } from '../../../tag.module'
import { CreateTagInput } from '../../create-tag/create-tag.input'
import {
  CreateTagGql,
  CreateTagMutation,
} from '../../create-tag/tests/create-tag.api.graphql'
import { createTagInput } from '../../create-tag/tests/create-tag.data'
import { GetTagInput } from '../../get-tag/get-tag.input'
import { GetTagGql, GetTagQuery } from '../../get-tag/tests/get-tag.api.graphql'
import { UpdateTagInput } from '../update-tag.input'
import { UpdateTagGql, UpdateTagMutation } from './update-tag.api.graphql'

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
        { where: { id: createdTagId } },
      )

      expect(getTag).toMatchObject({
        id: createdTagId,
        ...updateTagInput.data,
      })
    })
  })
})
