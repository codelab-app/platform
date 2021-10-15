import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { TagModule } from '../../../tag.module'
import { CreateTagInput } from '../../create-tag'
import {
  TestCreateTagGql,
  TestCreateTagMutation,
} from '../../create-tag/tests/create-tag.api.graphql.gen'
import { createTagInput } from '../../create-tag/tests/create-tag.data'
import { GetTagInput } from '../get-tag.input'
import { TestGetTagGql, TestGetTagQuery } from './get-tag.api.graphql.gen'

describe('GetTagUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let createdTagId: string

  beforeAll(async () => {
    guestApp = await setupTestModule([TagModule], { role: Role.Guest })
    userApp = await setupTestModule([TagModule], { role: Role.User })

    const { createTag } = await domainRequest<
      CreateTagInput,
      TestCreateTagMutation
    >(userApp, TestCreateTagGql, createTagInput)

    createdTagId = createTag.id
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to get a Tag', async () => {
      await domainRequest<GetTagInput, TestGetTagQuery>(
        guestApp,
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
      const { getTag } = await domainRequest<GetTagInput, TestGetTagQuery>(
        userApp,
        TestGetTagGql,
        { where: { id: createdTagId } },
      )

      expect(getTag).toMatchObject(createTagInput)
    })

    it('should get Tag by name', async () => {
      const { getTag } = await domainRequest<GetTagInput, TestGetTagQuery>(
        userApp,
        TestGetTagGql,
        { where: { name: createTagInput.name } },
      )

      expect(getTag).toMatchObject(createTagInput)
    })
  })
})
