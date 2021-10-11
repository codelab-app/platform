import { domainRequest } from '@codelab/backend/infra'
import { setupTestModule, teardownTestModule } from '@codelab/backend/nestjs'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { TagModule } from '../../../tag.module'
import { CreateTagInput } from '../../create-tag'
import {
  TestCreateTagGql,
  TestCreateTagMutation,
} from '../../create-tag/tests/create-tag.api.graphql.gen'
import { createTagInput } from '../../create-tag/tests/create-tag.data'
import { UpdateTagInput } from '../update-tag.input'
import {
  TestUpdateTagGql,
  TestUpdateTagMutation,
} from './update-tag.api.graphql.gen'

describe('UpdateTagUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let updateTagInput: UpdateTagInput
  let createdTagId: string

  beforeAll(async () => {
    guestApp = await setupTestModule([TagModule], { role: Role.Guest })
    userApp = await setupTestModule([TagModule], { role: Role.User })

    const { createTag } = await domainRequest<
      CreateTagInput,
      TestCreateTagMutation
    >(userApp, TestCreateTagGql, createTagInput)

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
      await domainRequest(guestApp, TestUpdateTagGql, updateTagInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should update a Tag', async () => {
      const { updateTag } = await domainRequest<
        UpdateTagInput,
        TestUpdateTagMutation
      >(userApp, TestUpdateTagGql, updateTagInput)

      expect(updateTag).toMatchObject({
        id: createdTagId,
        ...updateTagInput.data,
      })
    })
  })
})
